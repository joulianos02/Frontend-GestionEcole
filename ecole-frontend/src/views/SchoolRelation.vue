<template>
  <div class="school-relation">
    <h1>Relations étudiant-cours</h1>
    <div v-if="loading" class="loading">Chargement en cours...</div>
    <div v-else>
      <table class="relation-table">
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Cours</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="relation in relations" :key="relation.id">
            <td>{{ relation.student }}</td>
            <td>{{ relation.course }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {relationAPI} from '../services/api.js';

export default {
  data() {
    return {
      relations: [],
      loading: false,
      error: null,
    };
  },
  methods: {
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
  },
  created() {
    this.fetchRelations();
  },
};
</script>

<style scoped>
.school-relation {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}

.relation-table {
  width: 100%;
  border-collapse: collapse;
}

.relation-table th,
.relation-table td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  text-align: left;
}

.relation-table th {
  background-color: #f3f3f3;
  font-weight: bold;
}

.relation-table tbody tr:nth-child(even) {
  background-color: #f8f8f8;
}
</style>
