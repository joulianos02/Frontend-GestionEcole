import { defineStore } from 'pinia';
import { userAPI } from '@/services/api';

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await userAPI.getAll();
        this.users = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createUser(user) {
      try {
        const response = await userAPI.create(user);
        this.users.push(response.data);
      } catch (error) {
        this.error = error;
      }
    },
    async updateUser(user) {
      try {
        const response = await userAPI.update(user.id, user);
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.users.splice(index, 1, response.data);
        }
      } catch (error) {
        this.error = error;
      }
    },
    async deleteUser(id) {
      try {
        await userAPI.delete(id);
        this.users = this.users.filter((u) => u.id !== id);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
