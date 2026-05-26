import { computed, ref, watch } from 'vue';

export const useFetch = (url: string | { value: string }) => {
  const data = ref(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  const resolvedUrl = computed(() =>
    typeof url === 'string' ? url : url.value,
  );

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(resolvedUrl.value);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  watch(() => resolvedUrl.value, fetchData, { immediate: true });

  return { fetchData, data, error, loading };
};
