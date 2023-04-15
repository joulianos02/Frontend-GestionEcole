import { defineStore } from 'pinia';
import { relationAPI } from '@/services/api';

export const relationStore = defineStore({
  id: 'relation',
  state: () => ({
    relations: [],
    loading: false,
    error: null,
  }),
  getters: {
    getRelationById: (state) => (id) => {
      return state.relations.find((relation) => relation.id === id);
    },
  },
  actions: {
    async fetchRelations() {
      this.loading = true;
      try {
        const response = await relationAPI.getAll();
        this.relations = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createRelation(relationData) {
      try {
        const response = await relationAPI.create(relationData);
        const newRelation = response.data;
        this.relations.push(newRelation);
        return newRelation;
      } catch (error) {
        this.error = error;
      }
    },
    async updateRelation({ id, data }) {
      try {
        const response = await relationAPI.update(id, data);
        const updatedRelation = response.data;
        const relationIndex = this.relations.findIndex(
          (relation) => relation.id === updatedRelation.id
        );
        this.relations.splice(relationIndex, 1, updatedRelation);
        return updatedRelation;
      } catch (error) {
        this.error = error;
      }
    },
    async deleteRelation(id) {
      try {
        await relationAPI.delete(id);
        const relationIndex = this.relations.findIndex((relation) => relation.id === id);
        this.relations.splice(relationIndex, 1);
      } catch (error) {
        this.error = error;
      }
    },
  },
});