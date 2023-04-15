<template>
  <div class="app-student">
    <h1>Liste des étudiants</h1>
    <div v-if="loading" class="loading">Chargement en cours...</div>
    <div v-else>
      <table class="student-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Classe</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.class }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { studentStore } from '@/store/student';

export default defineComponent({
  name: 'SchoolStudent',

  setup() {
    const { students, fetchStudents, loading } = studentStore();

    onMounted(() => {
      fetchStudents();
    });

    return {
      students,
      loading,
    };
  },
});
</script>

<style scoped>
.school-student {
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

.student-table {
  width: 100%;
  border-collapse: collapse;
}

.student-table th,
.student-table td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  text-align: left;
}

.student-table th {
  background-color: #f3f3f3;
  font-weight: bold;
}

.student-table tbody tr:nth-child(even) {
  background-color: #f8f8f8;
}
</style>