<template>
    <div>
      <h2>Connexion</h2>
      <form @submit.prevent="signIn">
        <label>Email:</label>
        <input type="email" v-model="email" required />
  
        <label>Mot de passe:</label>
        <input type="password" v-model="password" required />
  
        <button type="submit">Se connecter</button>
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
      async signIn() {
        try {
          await auth.signInWithEmailAndPassword(this.email, this.password);
          this.$router.push('/');
        } catch (error) {
          console.error(error.message);
        }
      },
    },
  };
  </script>
  