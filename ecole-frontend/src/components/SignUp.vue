<template>
    <div>
      <h2>Inscription</h2>
      <form @submit.prevent="signUp">
        <label>Email:</label>
        <input type="email" v-model="email" required />
  
        <label>Mot de passe:</label>
        <input type="password" v-model="password" required />
  
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import { auth } from '@/firebase';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async signUp() {
        try {
          await auth.createUserWithEmailAndPassword(this.email, this.password);
          this.$router.push('/');
        } catch (error) {
          console.error(error.message);
        }
      },
    },
  };
  </script>
  