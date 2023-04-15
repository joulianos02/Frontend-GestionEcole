import { defineStore } from 'pinia';
import { userRoleAPI } from '@/services/api';

export const useUserRoleStore = defineStore('userRole', {
  state: () => ({
    userRoles: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUserRoles() {
      this.loading = true;
      try {
        const response = await userRoleAPI.getAll();
        this.userRoles = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async createUserRole(userRole) {
      try {
        const response = await userRoleAPI.create(userRole);
        this.userRoles.push(response.data);
      } catch (error) {
        this.error = error;
      }
    },

    async updateUserRole(userRole) {
      try {
        const response = await userRoleAPI.update(userRole.id, userRole);
        const index = this.userRoles.findIndex((u) => u.id === userRole.id);
        if (index !== -1) {
          this.userRoles.splice(index, 1, response.data);
        }
      } catch (error) {
        this.error = error;
      }
    },

    async deleteUserRole(id) {
      try {
        await userRoleAPI.delete(id);
        const index = this.userRoles.findIndex((u) => u.id === id);
        if (index !== -1) {
          this.userRoles.splice(index, 1);
        }
      } catch (error) {
        this.error = error;
      }
    },
  },
});

