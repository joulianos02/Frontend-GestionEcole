import { defineStore } from 'pinia';
import { assignmentAPI } from '@/services/api';

export const useAssignmentStore = defineStore('assignment', {
  state: () => ({
    assignments: [],
    assignment: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAssignments() {
      this.loading = true;
      try {
        const response = await assignmentAPI.getAll();
        this.assignments = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchAssignment(id) {
      this.loading = true;
      try {
        const response = await assignmentAPI.get(id);
        this.assignment = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createAssignment(data) {
      this.loading = true;
      try {
        const response = await assignmentAPI.create(data);
        this.assignments.push(response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateAssignment(id, data) {
      this.loading = true;
      try {
        const response = await assignmentAPI.update(id, data);
        const index = this.assignments.findIndex((assignment) => assignment.id === id);
        if (index !== -1) {
          this.assignments.splice(index, 1, response.data);
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async deleteAssignment(id) {
      this.loading = true;
      try {
        await assignmentAPI.delete(id);
        const index = this.assignments.findIndex((assignment) => assignment.id === id);
        if (index !== -1) {
          this.assignments.splice(index, 1);
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
