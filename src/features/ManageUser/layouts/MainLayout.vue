<script setup>
import Menubar from 'primevue/menubar';
import { useRouter } from 'vue-router';
import { useConfigsStore } from '../stores/config';

const store = useConfigsStore();
const router = useRouter();
const items = [
  { label: 'Home', icon: 'pi pi-home', command: () => router.push('/') },
  {
    label: 'User List',
    icon: 'pi pi-users',
    command: () => router.push('/user/list'),
  },
];
</script>

<template>
  <div class="layout">
    <header>
      <Menubar :model="items" class="layout-nav">
        <template #end>
          <div class="layout-mode">
            Mode: <span>{{ store.configs.darkMode ? 'Dark' : 'Light' }}</span>
          </div>
        </template>
      </Menubar>
    </header>
    <main class="layout-main">
      <router-view />
    </main>
    <footer class="layout-footer">Learning project 2026</footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--p-surface-1, #f8fafc);
}

.layout-nav {
  border-radius: 0;
  border: none;
  border-bottom: 1px solid var(--p-surface-border, #e2e8f0);
}

.layout-mode {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--p-text-muted-color, #64748b);
  font-size: 0.9rem;
}

.layout-main {
  flex: 1;
  padding: 24px 20px 40px;
}

.layout-footer {
  padding: 16px 20px;
  text-align: center;
  color: var(--p-text-muted-color, #64748b);
  border-top: 1px solid var(--p-surface-border, #e2e8f0);
  background: var(--p-surface-0, #ffffff);
}
</style>
