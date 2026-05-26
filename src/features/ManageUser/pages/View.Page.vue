<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Toolbar from 'primevue/toolbar';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserDetail } from '../queries/user.queries';

const route = useRoute();
const router = useRouter();

const userId = computed(() => Number(route.params.id ?? 0));

const { data: selectedUser, isPending, isError, error } = useUserDetail(userId);

const personalInfo = computed(() => {
  if (!selectedUser.value) return [];
  const { email, phone, age, gender } = selectedUser.value;
  return [
    { label: 'Email', value: email },
    { label: 'Phone', value: phone },
    { label: 'Age', value: age },
    { label: 'Gender', value: gender },
  ].filter((d) => d.value);
});

const workInfo = computed(() => {
  if (!selectedUser.value) return [];
  const { company } = selectedUser.value;
  return [
    { label: 'Company', value: company?.name },
    { label: 'Department', value: company?.department },
    { label: 'Title', value: company?.title },
  ].filter((d) => d.value);
});

const addressInfo = computed(() => {
  if (!selectedUser.value) return [];
  const { address } = selectedUser.value;
  return [
    { label: 'Address', value: address?.address },
    { label: 'City', value: address?.city },
    { label: 'State', value: address?.state },
    { label: 'Country', value: address?.country },
    { label: 'Postal Code', value: address?.postalCode },
  ].filter((d) => d.value);
});

const userFullName = computed(() => {
  if (!selectedUser.value) return '';
  const { firstName, lastName } = selectedUser.value;
  return `${firstName} ${lastName}`;
});

const goBack = () => {
  router.push({ name: 'list-user' });
};
</script>

<template>
  <div class="page">
    <Toolbar class="page-toolbar">
      <template #start>
        <div class="page-title">User Profile</div>
      </template>
      <template #end>
        <Button label="Back to list" text @click="goBack" />
      </template>
    </Toolbar>

    <div v-if="isPending" class="loading-container">
      <p>Loading user data...</p>
    </div>

    <div v-else-if="isError" class="error-container">
      <p>{{ error?.message }}</p>
    </div>

    <div v-else-if="selectedUser" class="content">
      <!-- Header Card -->
      <Card class="header-card">
        <template #content>
          <div class="user-header">
            <div class="user-info">
              <h1 class="user-name">{{ userFullName }}</h1>
              <p class="user-id">ID: {{ userId }}</p>
            </div>
            <Tag value="Active" severity="success" />
          </div>
        </template>
      </Card>

      <!-- Personal Info Section -->
      <Card v-if="personalInfo.length" class="info-card">
        <template #title>
          <div class="section-title">Personal Information</div>
        </template>
        <template #content>
          <div class="info-grid">
            <div
              class="info-item"
              v-for="item in personalInfo"
              :key="item.label"
            >
              <span class="info-label">{{ item.label }}</span>
              <span class="info-value">{{ item.value }}</span>
            </div>
          </div>
        </template>
      </Card>

      <!-- Work Info Section -->
      <Card v-if="workInfo.length" class="info-card">
        <template #title>
          <div class="section-title">Work Information</div>
        </template>
        <template #content>
          <div class="info-grid">
            <div class="info-item" v-for="item in workInfo" :key="item.label">
              <span class="info-label">{{ item.label }}</span>
              <span class="info-value">{{ item.value }}</span>
            </div>
          </div>
        </template>
      </Card>

      <!-- Address Info Section -->
      <Card v-if="addressInfo.length" class="info-card">
        <template #title>
          <div class="section-title">Address</div>
        </template>
        <template #content>
          <div class="info-grid">
            <div
              class="info-item"
              v-for="item in addressInfo"
              :key="item.label"
            >
              <span class="info-label">{{ item.label }}</span>
              <span class="info-value">{{ item.value }}</span>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="empty-container">
      <p>User not found.</p>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-toolbar {
  border-radius: 12px;
  border: none;
  background: transparent;
  padding: 0;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--p-text-color);
}

/* Content */
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Header Card */
.header-card {
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    var(--p-primary-color) 0%,
    var(--p-primary-600) 100%
  );
  border: none;
  padding: 0;
  overflow: hidden;
}

.header-card :deep(.p-card-content) {
  padding: 24px;
  background: linear-gradient(
    135deg,
    var(--p-primary-color) 0%,
    var(--p-primary-600) 100%
  );
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-name {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.user-id {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Info Cards */
.info-card {
  border-radius: 12px;
  border: 1px solid var(--p-surface-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.info-card :deep(.p-card-content) {
  padding: 20px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--p-text-color);
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-radius: 8px;
  background: var(--p-surface-50);
}

.info-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--p-text-color-secondary);
}

.info-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--p-text-color);
  word-break: break-word;
}

/* States */
.loading-container,
.error-container,
.empty-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 24px;
  border-radius: 12px;
  background: var(--p-surface-50);
  border: 1px solid var(--p-surface-border);
}

.loading-container p,
.error-container p,
.empty-container p {
  font-size: 16px;
  margin: 0;
  color: var(--p-text-color-secondary);
}

.error-container p {
  color: var(--p-error-color);
}

/* Responsive */
@media (max-width: 768px) {
  .page {
    padding: 16px;
    gap: 16px;
  }

  .page-title {
    font-size: 22px;
  }

  .user-name {
    font-size: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .user-header {
    flex-direction: column;
  }
}
</style>
