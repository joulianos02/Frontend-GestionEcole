<template>
  <div class="app-course">
    <h1>Liste des cours</h1>
    <div v-if="loading" class="loading">Chargement en cours...</div>
    <div v-else>
      <table class="course-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course.id">
            <td>{{ course.title }}</td>
            <td>{{ course.description }}</td>
            <td>
              <button @click="editCourse(course)">Modifier</button>
              <button @click="deleteCourse(course)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addCourse">Ajouter un cours</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useCourseStore } from '@/store/course';

export default defineComponent({
  name: 'SchoolCourse',

  setup() {
    const courseStore = useCourseStore();

    const courses = courseStore.courses;
    const loading = courseStore.loading;
    const error = courseStore.error;

    const fetchCourses = () => {
      courseStore.fetchCourses();
    };

    const addCourse = () => {
      courseStore.addCourse();
    };

    const editCourse = (course) => {
      courseStore.editCourse(course);
    };

    const deleteCourse = (course) => {
      courseStore.deleteCourse(course.id);
    };

    return {
      courses,
      loading,
      error,
      fetchCourses,
      addCourse,
      editCourse,
      deleteCourse,
    };
  },
});
</script>

<style scoped>
.school-course {
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

.course-table {
  width: 100%;
  border-collapse: collapse;
}

.course-table th,
.course-table td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  text-align: left;
}

.course-table th {
  background-color: #f3f3f3;
  font-weight: bold;
}

.course-table tbody tr:nth-child(even) {
  background-color: #f8f8f8;
}
</style>
