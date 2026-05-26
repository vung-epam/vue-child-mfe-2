<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { computed, ref } from 'vue';
import { getEmailError } from '../utils/email.utils';

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

const props = defineProps<{
  loading?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  submit: [values: UserFormValues];
  cancel: [];
}>();

const form = ref<UserFormValues>({
  firstName: '',
  lastName: '',
  email: '',
});

const emailError = computed(() => getEmailError(form.value.email));
const isFormInvalid = computed(
  () => !form.value.firstName.trim() || !form.value.lastName.trim() || emailError.value !== null,
);

const resetForm = () => {
  form.value = { firstName: '', lastName: '', email: '' };
};

const onSubmit = () => {
  if (isFormInvalid.value) return;
  emit('submit', { ...form.value });
};
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="field">
      <label for="firstName">First name*</label>
      <InputText
        id="firstName"
        v-model="form.firstName"
        placeholder="e.g. Alex"
        :disabled="props.disabled || props.loading"
      />
    </div>

    <div class="field">
      <label for="lastName">Last name*</label>
      <InputText
        id="lastName"
        v-model="form.lastName"
        placeholder="e.g. Nguyen"
        :disabled="props.disabled || props.loading"
      />
    </div>

    <div class="field">
      <label for="email">Email address*</label>
      <InputText
        id="email"
        v-model="form.email"
        placeholder="e.g. alex.nguyen@epam.com"
        :disabled="props.disabled || props.loading"
        :invalid="!!emailError && form.email.length > 0"
      />
      <Message
        v-if="emailError && form.email.length > 0"
        severity="error"
        :closable="false"
        class="field-error"
      >
        {{ emailError }}
      </Message>
    </div>

    <div class="actions">
      <Button
        label="Create user"
        type="submit"
        :disabled="props.disabled || props.loading || isFormInvalid"
        :loading="props.loading"
      />
      <Button
        label="Reset"
        text
        type="button"
        :disabled="props.loading"
        @click="resetForm"
      />
      <Button
        label="Cancel"
        text
        type="button"
        :disabled="props.loading"
        @click="emit('cancel')"
      />
    </div>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-error {
  font-size: 0.85rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  grid-column: 1 / -1;
}
</style>
