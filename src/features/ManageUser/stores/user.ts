import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const users = ref([
    {
      id: 1,
      name: 'Vu',
      email: 'vu@email.com',
    },
  ]);

  const add = (id: number, name: string, email: string) => {
    users.value.push({
      id,
      name,
      email,
    });
  };

  return {
    users,
    add,
  };
});
