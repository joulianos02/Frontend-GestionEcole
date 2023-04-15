<template>
  <div class="app-user">
    <h1>Liste des utilisateurs</h1>
    <div v-if="loading" class="loading">Chargement en cours...</div>
    <div v-else>
      <table class="user-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { userStore } from '@/store/users';

export default {
  data() {
    return {
      users: userStore.users,
    };
  },
  methods: {
    async deleteUser(id) {
      await userStore.deleteUser(id);
    },
  },
};
</script>


<style scoped>
.app-user {
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

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  text-align: left;
}

.user-table th {
  background-color: #f3f3f3;
  font-weight: bold;
}

.user-table tbody tr:nth-child(even) {
  background-color: #f8f8f8;
}
</style>
