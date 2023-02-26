<script>
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"

export default {
  data() {
    return {
      /**Inicializa el usuario null */
      user: null
    }

  },
  methods: {
    logout() {
      /**Realiza el cierre de sesión
       * Y redirige a la página de inicio
       */
      signOut(auth).then(() => {
        this.$router.push({ name: 'HelloWorld' })
      }).catch((error) => {

      });
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      /**Si el usuario está autenticado devuelve al usuario, sino
       * es nulo
       */
      if (user) {

        //const uid = user.uid;
        this.user = user;

      } else {

        this.user = null;

      }
    });
  }
}




</script>

<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">

      <router-link to="/"><a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap"></use>
          </svg>
          <span class="fs-4">Cursos Online </span>
        </a></router-link>


      <ul class="nav nav-pills">
        <router-link to="/">
          <li class="nav-item"><a class="nav-link">Home</a></li>
        </router-link>
        <template v-if="user">

          <router-link to="/privado">
            <li class="nav-item"><a class="nav-link">Privado</a></li>
          </router-link>
          <button @click="logout">Cerrar Sesión</button>

          <p style="position:absolute;margin-left: 500px;">{{ user.email }}</p>



        </template>

        <template v-else>
          <router-link to="/registro">
            <li class="nav-item"><a class="nav-link">Registro</a></li>
          </router-link>
          <router-link to="/login">
            <li class="nav-item"><a class="nav-link">Login</a></li>
          </router-link>

        </template>




        <div class="dropdown">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
            data-bs-toggle="dropdown" aria-expanded="false">
            Cursos
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">

            <router-link to="/cursos/Ofimática">
              <li><a class="dropdown-item">Ofimática</a></li>
            </router-link>
            <router-link to="/cursos/Programación">
              <li><a class="dropdown-item">Programación</a></li>
            </router-link>
            <router-link to="/cursos/Sistemas Operativos">
              <li><a class="dropdown-item">Sistemas Operativos</a></li>
            </router-link>

          </ul>


        </div>

      </ul>


  </header>

</div>





<main>
  <router-view></router-view>

</main></template>