<template>
  <div class="app-assignment">
    <h1>Liste des devoirs</h1>
    <div v-if="loading" class="loading">Chargement en cours...</div>
    <div v-else>
      <table class="assignment-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="assignment in assignments" :key="assignment.id">
            <td>{{ assignment.title }}</td>
            <td>{{ assignment.description }}</td>
            <td>{{ assignment.start_date }}</td>
            <td>{{ assignment.end_date }}</td>
            <td>
              <button @click="editAssignment(assignment)">Modifier</button>
              <button @click="deleteAssignment(assignment)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="createAssignment">Créer un devoir</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useAssignmentStore } from '@/store/assignment';

export default defineComponent({
  name: 'SchoolAssignment',
  setup() {
    const assignmentStore = useAssignmentStore();

    const assignments = assignmentStore.assignments;
    const loading = assignmentStore.loading;
    const error = assignmentStore.error;

    const fetchAssignments = assignmentStore.fetchAssignments;
    const createAssignment = assignmentStore.createAssignment;
    const editAssignment = assignmentStore.editAssignment;
    const deleteAssignment = assignmentStore.deleteAssignment;

    fetchAssignments();

    return {
      assignments,
      loading,
      error,
      createAssignment,
      editAssignment,
      deleteAssignment,
    };
  },
});
</script>


<style scoped>
.school-assignment {
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

.assignment-list {
  list-style-type: none;
  padding: 0;
}

.assignment-list li {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #333;
}
</style>
