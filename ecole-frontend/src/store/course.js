import { defineStore } from 'pinia';
import { courseAPI } from '@/services/api';

export const useCourseStore = defineStore({
  id: 'course',
  state: () => ({
    courses: [],
    loading: false,
    error: null,
  }),
  getters: {
    getCourseById: (state) => (id) => {
      return state.courses.find((course) => course.id === id);
    },
  },
  actions: {
    async fetchCourses() {
      this.loading = true;
      try {
        const response = await courseAPI.getAll();
        this.courses = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createCourse(courseData) {
      try {
        const response = await courseAPI.create(courseData);
        const newCourse = response.data;
        this.courses.push(newCourse);
        return newCourse;
      } catch (error) {
        this.error = error;
      }
    },
    async updateCourse({ id, data }) {
      try {
        const response = await courseAPI.update(id, data);
        const updatedCourse = response.data;
        const courseIndex = this.courses.findIndex(
          (course) => course.id === updatedCourse.id
        );
        this.courses.splice(courseIndex, 1, updatedCourse);
        return updatedCourse;
      } catch (error) {
        this.error = error;
      }
    },
    async deleteCourse(id) {
      try {
        await courseAPI.delete(id);
        const courseIndex = this.courses.findIndex((course) => course.id === id);
        this.courses.splice(courseIndex, 1);
      } catch (error) {
        this.error = error;
      }
    },
  },
});

