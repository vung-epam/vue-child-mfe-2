<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Toolbar from 'primevue/toolbar';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsers } from '../queries/user.queries';

const router = useRouter();
const search = ref('');

const { data, isPending, isError } = useUsers();

const filteredUsers = computed(() => {
  const usersArray = Array.isArray(data.value?.users) ? data.value.users : [];
  const keyword = search.value.trim().toLowerCase();
  if (!keyword) return usersArray;
  return usersArray.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(keyword) || user.email.toLowerCase().includes(keyword)
    );
  });
});

const createUser = () => {
  router.push({ name: 'create-user' });
};

const viewUser = (id: string | number) => {
  router.push({ name: 'view-user', params: { id: String(id) } });
};
</script>

<template>
  <div class="page">
    <Toolbar class="page-toolbar">
      <template #start>
        <div>
          <div class="page-title">Users</div>
          <div class="page-subtitle">Manage access, roles, and visibility.</div>
        </div>
      </template>
      <template #end>
        <Button label="Create user" @click="createUser" />
      </template>
    </Toolbar>

    <Card class="content-card">
      <template #title>Directory</template>
      <template #subtitle>Search, review, and update user records.</template>
      <template #content>
        <div class="table-header">
          <span class="search-label">Search</span>
          <InputText
            v-model="search"
            class="search-input"
            placeholder="Search by name, email, or ID"
          />
        </div>

        <div v-if="isPending" class="loading-state">Loading users...</div>
        <div v-else-if="isError" class="error-state">Error loading users.</div>
        <DataTable
          v-else
          :value="filteredUsers"
          dataKey="id"
          stripedRows
          class="data-table"
        >
          <Column field="id" header="ID" />
          <Column header="Name">
            <template #body="{ data }">
              {{ data.firstName }} {{ data.lastName }}
            </template>
          </Column>
          <Column field="email" header="Email" />
          <Column header="Actions">
            <template #body="{ data }">
              <div class="table-actions">
                <Button label="View" text @click="viewUser(data.id)" />
              </div>
            </template>
          </Column>
          <template #empty>
            <div class="empty">No users found for this search.</div>
          </template>
        </DataTable>
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

.page-subtitle {
  color: var(--p-text-muted-color, #6b7280);
  font-size: 14px;
  margin-top: 4px;
}

.content-card {
  border-radius: 18px;
}

.table-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.search-label {
  font-weight: 600;
}

.search-input {
  flex: 1;
}

.data-table {
  border-radius: 14px;
}

.table-actions {
  display: flex;
  gap: 8px;
}

.empty {
  padding: 20px 0;
  color: var(--p-text-muted-color, #6b7280);
}
</style>
