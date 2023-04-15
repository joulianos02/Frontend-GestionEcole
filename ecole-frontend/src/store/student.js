import { defineStore } from 'pinia';
import { studentAPI } from '@/services/api';

export const studentStore = defineStore({
  id: 'student',
  state: () => ({
    students: [],
    loading: false,
    error: null,
  }),
  getters: {
    getStudentById: (state) => (id) => {
      return state.students.find((student) => student.id === id);
    },
  },
  actions: {
    async fetchStudents() {
      this.loading = true;
      try {
        const response = await studentAPI.getAll();
        this.students = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createStudent(studentData) {
      try {
        const response = await studentAPI.create(studentData);
        const newStudent = response.data;
        this.students.push(newStudent);
        return newStudent;
      } catch (error) {
        this.error = error;
      }
    },
    async updateStudent({ id, data }) {
      try {
        const response = await studentAPI.update(id, data);
        const updatedStudent = response.data;
        const studentIndex = this.students.findIndex(
          (student) => student.id === updatedStudent.id
        );
        this.students.splice(studentIndex, 1, updatedStudent);
        return updatedStudent;
      } catch (error) {
        this.error = error;
      }
    },
    async deleteStudent(id) {
      try {
        await studentAPI.delete(id);
        const studentIndex = this.students.findIndex((student) => student.id === id);
        this.students.splice(studentIndex, 1);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
