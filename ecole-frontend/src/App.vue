<template>
  <div id="app">
    <nav>
      <router-link to="/SchoolAssignment">School Assignment</router-link>
      <router-link to="/SchoolCourse">School Course</router-link>
      <router-link to="/SchoolRelation">School Relation</router-link>
      <router-link to="/UserRole">User Role</router-link>
      <router-link to="/SchoolStudent">School Student</router-link>
      <router-link to="/SchoolTeacher">School Teacher</router-link>
      <router-link to="/AppUser">App User</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
nav {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #f5f5f5;
}

nav a {
  text-decoration: none;
  color: #333;
font-weight: bold;
}

nav a:hover {
color: #007bff;
}

#app {
font-family: "Avenir", Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}
</style>
