<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Message from 'primevue/message';
import Toolbar from 'primevue/toolbar';
import { computed, onMounted, onWatcherCleanup, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCreateUsersBulk } from '../queries/user.queries';
import { parseBulkInput } from '../utils/bulk.utils';

const router = useRouter();
const { mutate, isPending } = useCreateUsersBulk();

const bulkInput = ref('');
const statusMessage = ref('');
const errorMessage = ref('');

const isOffline = ref(false);
const networkHint = ref('');

const parseResult = computed(() => parseBulkInput(bulkInput.value));

const canSubmit = computed(
  () =>
    !isOffline.value &&
    !isPending.value &&
    parseResult.value.rows.length > 0 &&
    parseResult.value.errors.length === 0,
);

const updateNetworkStatus = () => {
  isOffline.value = !navigator.onLine;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  const file = target?.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    bulkInput.value = String(reader.result ?? '');
  };
  reader.readAsText(file);
};

const clearInput = () => {
  bulkInput.value = '';
  statusMessage.value = '';
  errorMessage.value = '';
};

const submitBulk = () => {
  statusMessage.value = '';
  errorMessage.value = '';

  if (!canSubmit.value) return;

  mutate(parseResult.value.rows, {
    onSuccess: () => {
      statusMessage.value = `Successfully created ${parseResult.value.rows.length} users.`;
      setTimeout(() => {
        router.push({ name: 'list-user' });
      }, 700);
    },
    onError: () => {
      errorMessage.value = 'Bulk creation failed. Please review and try again.';
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
    ? 'Network appears offline. Please reconnect before bulk creation.'
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
        <div class="page-title">Bulk Create Users</div>
      </template>
      <template #end>
        <Button label="Back to list" text @click="goBack" />
      </template>
    </Toolbar>

    <Card class="content-card">
      <template #title>Bulk Input</template>
      <template #subtitle
        >Upload a CSV file or paste rows directly to create multiple
        users.</template
      >
      <template #content>
        <Message severity="info" :closable="false">
          CSV supports headers: firstName,lastName,email. Emails must be
          @epam.com.
        </Message>

        <Message v-if="networkHint" severity="warn" :closable="false">
          {{ networkHint }}
        </Message>

        <Message v-if="statusMessage" severity="success" :closable="false">
          {{ statusMessage }}
        </Message>

        <Message v-if="errorMessage" severity="error" :closable="false">
          {{ errorMessage }}
        </Message>

        <Divider />

        <div class="input-section">
          <label class="input-label" for="bulk-file">CSV file</label>
          <input
            id="bulk-file"
            class="file-input"
            type="file"
            accept=".csv"
            :disabled="isOffline || isPending"
            @change="onFileChange"
          />
        </div>

        <div class="input-section">
          <label class="input-label" for="bulk-text">Paste rows</label>
          <textarea
            id="bulk-text"
            v-model="bulkInput"
            class="bulk-textarea"
            :disabled="isOffline || isPending"
            placeholder="firstName,lastName,email&#10;Jane,Doe,jane.doe@epam.com"
            rows="8"
          ></textarea>
        </div>

        <div class="summary">
          <div>Rows detected: {{ parseResult.rows.length }}</div>
          <div v-if="parseResult.hasHeader" class="summary-hint">
            Header row detected.
          </div>
        </div>

        <Message
          v-if="parseResult.errors.length"
          severity="error"
          :closable="false"
        >
          <div class="error-title">Please resolve the following:</div>
          <ul class="error-list">
            <li v-for="(err, index) in parseResult.errors" :key="index">
              {{ err }}
            </li>
          </ul>
        </Message>

        <Divider />

        <div class="actions">
          <Button
            label="Submit bulk users"
            :loading="isPending"
            :disabled="!canSubmit"
            @click="submitBulk"
          />
          <Button
            label="Clear"
            text
            :disabled="isPending"
            @click="clearInput"
          />
        </div>
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

.input-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.input-label {
  font-weight: 600;
}

.file-input {
  border: 1px solid var(--p-content-border-color, #d1d5db);
  border-radius: 10px;
  padding: 10px;
  background: var(--p-surface-0, #fff);
}

.bulk-textarea {
  width: 100%;
  border: 1px solid var(--p-content-border-color, #d1d5db);
  border-radius: 12px;
  padding: 12px;
  font-family: inherit;
  resize: vertical;
}

.summary {
  display: flex;
  gap: 12px;
  margin: 12px 0 4px;
  font-weight: 500;
}

.summary-hint {
  color: var(--p-text-muted-color, #6b7280);
}

.error-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.error-list {
  margin: 0;
  padding-left: 20px;
}

.actions {
  display: flex;
  gap: 12px;
}
</style>
