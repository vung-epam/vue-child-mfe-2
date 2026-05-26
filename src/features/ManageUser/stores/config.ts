import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';

export const useConfigsStore = defineStore('configs', () => {
  const configs = ref({
    darkMode: false,
  });

  watchEffect((onCleanup) => {
    const storageWatch = () => {
      if (localStorage.getItem('darkMode')) {
        configs.value.darkMode = Boolean(localStorage.getItem('darkMode'));
      }
    };
    globalThis.addEventListener('storage', storageWatch);

    onCleanup(() => {
      globalThis.removeEventListener('storage', storageWatch);
    });
  });

  const toggleTheme = () => {
    configs.value.darkMode = !configs.value.darkMode;
  };

  return { configs, toggleTheme };
});
