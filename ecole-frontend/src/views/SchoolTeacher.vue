<template>
  <div class="app-school-teacher">
    <h1>Liste des enseignants</h1>
    <div v-if="loading" class="loading">Chargement en cours...</div>
    <div v-else>
      <table class="teacher-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers" :key="teacher.id">
            <td>{{ teacher.name }}</td>
            <td>{{ teacher.email }}</td>
            <td>
              <button @click="editTeacher(teacher)">Editer</button>
              <button @click="deleteTeacher(teacher)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="add-teacher">
        <h2>Ajouter un enseignant</h2>
        <form @submit.prevent="createTeacher">
          <div>
            <label>Nom</label>
            <input type="text" v-model="newTeacher.name" required>
          </div>
          <div>
            <label>Email</label>
            <input type="email" v-model="newTeacher.email" required>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useTeacherStore } from '@/store/teacher';

export default defineComponent({
  name: 'SchoolTeacher',
  setup() {
    const { teachers, loading, createTeacher, editTeacher, deleteTeacher, newTeacher } = useTeacherStore();

    return {
      teachers,
      loading,
      createTeacher,
      editTeacher,
      deleteTeacher,
      newTeacher,
    };
  },
});
</script>

<style scoped>
.school-teacher {
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

.teacher-list {
  list-style-type: none;
  padding: 0;
}

.teacher-list li {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
}
</style>
