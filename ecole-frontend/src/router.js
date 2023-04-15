import { createRouter, createWebHistory } from 'vue-router';
import SchoolAssignment from './views/SchoolAssignment.vue';
import SchoolCourse from './views/SchoolCourse.vue';
import SchoolRelation from './views/SchoolRelation.vue';
import UserRole from './views/UserRole.vue';
import SchoolStudent from './views/SchoolStudent.vue';
import SchoolTeacher from './views/SchoolTeacher.vue';
import AppUser from './views/AppUser.vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';

const routes = [
  {
    path: '/SchoolAssignment',
    name: 'SchoolAssignment',
    component: SchoolAssignment,
  },
  {
    path: '/school-course',
    name: 'SchoolCourse',
    component: SchoolCourse,
  },
  {
    path: '/school-relation',
    name: 'SchoolRelation',
    component: SchoolRelation,
  },
  {
    path: '/user-role',
    name: 'UserRole',
    component: UserRole,
  },
  {
    path: '/school-student',
    name: 'SchoolStudent',
    component: SchoolStudent,
  },
  {
    path: '/school-teacher',
    name: 'SchoolTeacher',
    component: SchoolTeacher,
  },
  {
    path: '/app-user',
    name: 'AppUser',
    component: AppUser,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
