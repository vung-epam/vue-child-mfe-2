<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Message from 'primevue/message';
import Toolbar from 'primevue/toolbar';
import { onMounted, onWatcherCleanup, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import UserForm, { type UserFormValues } from '../components/UserForm.vue';
import { useCreateUser } from '../queries/user.queries';

const router = useRouter();
const { mutate, isPending } = useCreateUser();

const isOffline = ref(false);
const networkHint = ref('');

const updateNetworkStatus = () => {
  isOffline.value = !navigator.onLine;
};

const onFormSubmit = (values: UserFormValues) => {
  mutate(values, {
    onSuccess: () => {
      router.push({ name: 'list-user' });
    },
  });
};

const goBack = () => {
  router.push({ name: 'list-user' });
};

onMounted(() => {
  updateNetworkStatus();
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
});

watch(isOffline, (value) => {
  networkHint.value = value
    ? 'Network appears offline. Please reconnect before creating a user.'
    : '';

  onWatcherCleanup(() => {
    window.removeEventListener('online', updateNetworkStatus);
    window.removeEventListener('offline', updateNetworkStatus);
  });
});
</script>

<template>
  <div class="page">
    <Toolbar class="page-toolbar">
      <template #start>
        <div class="page-title">Create User</div>
      </template>
      <template #end>
        <Button label="Back to list" text @click="goBack" />
      </template>
    </Toolbar>

    <Card class="content-card">
      <template #title>User Details</template>
      <template #subtitle
        >Provide basic information to create a new user.</template
      >
      <template #content>
        <Message severity="info" :closable="false">
          Fields marked as required should be completed before saving.
        </Message>

        <Message v-if="networkHint" severity="warn" :closable="false">
          {{ networkHint }}
        </Message>

        <Divider />

        <UserForm
          :loading="isPending"
          :disabled="isOffline"
          @submit="onFormSubmit"
          @cancel="goBack"
        />
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
</style>
