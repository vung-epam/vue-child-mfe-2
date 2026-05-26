<script setup lang="ts">
import { useFetch } from '../composables/useFetch';

const { data, loading, error } = useFetch('https://dummyjson.com/users/1');
</script>
<template>
  <div class="dummy">
    <h1>User 1</h1>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error.message }}</p>
    <pre v-else>{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>
