<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { Skeleton, ToggleSwitch } from 'primevue';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Tag from 'primevue/tag';
import { useConfigsStore } from '../stores/config';
import { computed } from 'vue';

const {
  loginWithRedirect,
  isAuthenticated,
  logout: auth0Logout,
  isLoading,
  user
} = useAuth0();

const displayName = computed(() => user.value?.name || 'Unknown user');
const displayEmail = computed(() => user.value?.email || 'No email');
const avatarLabel = computed(() => user.value?.name?.charAt(0) || '?');

const configsStore = useConfigsStore();
const signup = () => {
  loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
};

const login = () => {
  loginWithRedirect();
};

const logout = () => {
  auth0Logout();
};
</script>

<template>
  <template v-if="isLoading">
    <div class="loading">
      <Skeleton class="home" width="50%" height="200px" />
    </div>
  </template>

  <template v-if="!isLoading">
    <div class="home">
      <Card class="home-card">
        <template #title>
          <div class="title">
            <span>Welcome</span>
            <Tag v-if="isAuthenticated" value="Signed in" severity="success" />
            <Tag v-else value="Guest" severity="info" />
          </div>
        </template>
        <template #content>
          <div v-if="!isAuthenticated" class="content">
            <p class="subtitle">
              Create an account or log in to manage users.
            </p>
          </div>
          <div v-else class="profile">
            <Avatar
              :label="avatarLabel"
              shape="circle"
              size="large"
            />
            <div class="profile-info">
              <span class="name">{{ displayName }}</span>
              <span class="email">{{ displayEmail }}</span>
            </div>
          </div>
        </template>
        <template #footer>
          <Divider />
          <div v-if="!isAuthenticated" class="actions">
            <Button label="Sign up" @click="signup" />
            <Button label="Log in" severity="secondary" @click="login" />
          </div>
          <div v-else class="actions">
            <Button label="Log out" severity="danger" @click="logout" />
          </div>
        </template>
      </Card>
      <Card class="home-card">
        <template #content>
          <template v-if="isAuthenticated">
            <p class="subtitle">Theme preference</p>
            <div class="toggle-container">
              <ToggleSwitch v-model="configsStore.configs.darkMode" />
              <span class="toggle-label">
                {{ configsStore.configs.darkMode ? 'Dark Mode' : 'Light Mode' }}
              </span>
            </div>
          </template>
          <template v-else>
            <p>Please sign in to access the user management features.</p>
          </template>
        </template>
      </Card>
    </div>
  </template>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  padding: 48px 20px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.home-card {
  width: min(520px, 100%);
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 1.2rem;
  font-weight: 600;
}

.content {
  padding: 6px 0;
}

.subtitle {
  margin: 0;
  font-size: 1rem;
  color: var(--p-text-muted-color, #6b7280);
}

.profile {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.name {
  font-weight: 600;
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.email {
  color: var(--p-text-muted-color, #6b7280);
  font-size: 0.95rem;
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 48px 20px;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.toggle-label {
  font-size: 1rem;
  font-weight: 500;
  color: var(--p-text-color, #374151);
}
</style>
