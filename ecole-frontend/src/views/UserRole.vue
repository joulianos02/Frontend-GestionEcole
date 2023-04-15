<template>
  <div class="app-userrole">
    <h1>Liste des rôles</h1>
    <div v-if="loading" class="loading">Chargement en cours...</div>
    <div v-else>
      <table class="userrole-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.id }}</td>
            <td>{{ role.name }}</td>
            <td>{{ role.description }}</td>
            <td>
              <button @click="editRole(role)">Modifier</button>
              <button @click="deleteRole(role)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <form v-if="showForm" @submit.prevent="submitForm">
        <h2 v-if="editing">Modifier un rôle</h2>
        <h2 v-else>Créer un rôle</h2>
        <label>
          Nom:
          <input type="text" v-model="form.name" />
        </label>
        <label>
          Description:
          <input type="text" v-model="form.description" />
        </label>
        <button type="submit">{{ editing ? 'Modifier' : 'Créer' }}</button>
      </form>
      <button @click="toggleForm">{{ showForm ? 'Annuler' : 'Ajouter un rôle' }}</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useUserRoleStore } from '../store/UserRole.js';

export default defineComponent({
  setup() {
    const userRoleStore = useUserRoleStore();

    return {
      userRoleStore,
    };
  },
  data() {
    return {
      roles: [],
      loading: false,
      error: null,
      showForm: false,
      editing: null,
      form: {
        name: '',
        description: '',
      },
    };
  },
  methods: {
    async fetchRoles() {
      this.loading = true;
      try {
        await this.userRoleStore.fetchAll();
        this.roles = this.userRoleStore.all();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async submitForm() {
      if (this.editing) {
        await this.userRoleStore.update(this.editing.id, this.form);
      } else {
        await this.userRoleStore.create(this.form);
      }
      this.editing = null;
      this.form.name = '';
      this.form.description = '';
      this.showForm = false;
    },
    editRole(role) {
      this.editing = role;
      this.form.name = role.name;
      this.form.description = role.description;
      this.showForm = true;
    },
    async deleteRole(role) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
        await this.userRoleStore.delete(role.id);
        this.fetchRoles();
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
      this.editing = null;
      this.form.name = '';
      this.form.description = '';
    },
  },
  created() {
    this.fetchRoles();
  },
});
</script>


<style scoped>
.user-role {
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

.role-list {
  list-style-type: none;
  padding: 0;
}

.role-list li {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
}
</style>
