import { defineStore } from 'pinia';
import { teacherAPI } from '@/services/api';

export const useTeacherStore = defineStore({
  id: 'teacher',
  state: () => ({
    teachers: [],
    loading: false,
    error: null,
  }),
  getters: {
    getTeacherById: (state) => (id) => {
      return state.teachers.find((teacher) => teacher.id === id);
    },
  },
  actions: {
    async fetchTeachers() {
      this.loading = true;
      try {
        const response = await teacherAPI.getAll();
        this.teachers = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createTeacher(teacherData) {
      try {
        const response = await teacherAPI.create(teacherData);
        const newTeacher = response.data;
        this.teachers.push(newTeacher);
        return newTeacher;
      } catch (error) {
        this.error = error;
      }
    },
    async updateTeacher({ id, data }) {
      try {
        const response = await teacherAPI.update(id, data);
        const updatedTeacher = response.data;
        const teacherIndex = this.teachers.findIndex(
          (teacher) => teacher.id === updatedTeacher.id
        );
        this.teachers.splice(teacherIndex, 1, updatedTeacher);
        return updatedTeacher;
      } catch (error) {
        this.error = error;
      }
    },
    async deleteTeacher(id) {
      try {
        await teacherAPI.delete(id);
        const teacherIndex = this.teachers.findIndex((teacher) => teacher.id === id);
        this.teachers.splice(teacherIndex, 1);
      } catch (error) {
        this.error = error;
      }
    },
  },
});
