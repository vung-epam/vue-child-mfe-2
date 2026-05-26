<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Textarea from 'primevue/textarea';
import Toolbar from 'primevue/toolbar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

type UserRole = 'Admin' | 'Manager' | 'Viewer';

const router = useRouter();
const roles = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Viewer', value: 'Viewer' },
];

const form = ref<{
  name: string;
  email: string;
  role: UserRole | null;
  note: string;
}>({
  name: 'Jamie Tran',
  email: 'jamie.tran@company.com',
  role: 'Manager',
  note: 'Joined the growth team in 2024.',
});

const onSubmit = () => {};

const goBack = () => {
  router.push({ name: 'list-user' });
};
</script>

<template>
  <div class="page">
    <Toolbar class="page-toolbar">
      <template #start>
        <div class="page-title">Edit User</div>
      </template>
      <template #end>
        <Button label="Back to list" text @click="goBack" />
      </template>
    </Toolbar>

    <Card class="content-card">
      <template #title>Profile</template>
      <template #subtitle>Update user information and save changes.</template>
      <template #content>
        <Message severity="warn" :closable="false">
          Remember to notify the user after updating their role.
        </Message>

        <Divider />

        <form class="form" @submit.prevent="onSubmit">
          <div class="field">
            <label for="name">Full name</label>
            <InputText id="name" v-model="form.name" />
          </div>

          <div class="field">
            <label for="email">Email address</label>
            <InputText id="email" v-model="form.email" />
          </div>

          <div class="field">
            <label for="role">Role</label>
            <Dropdown
              id="role"
              v-model="form.role"
              :options="roles"
              optionLabel="label"
              optionValue="value"
              placeholder="Select a role"
            />
          </div>

          <div class="field">
            <label for="note">Note</label>
            <Textarea id="note" v-model="form.note" rows="4" />
          </div>

          <div class="actions">
            <Button label="Save changes" type="submit" />
            <Button label="Cancel" text type="button" @click="goBack" />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}

.page-toolbar {
  border-radius: 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
}

.content-card {
  border-radius: 18px;
}

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

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  grid-column: 1 / -1;
}
</style>
