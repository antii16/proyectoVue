<script setup>
import { collection } from 'firebase/firestore'

/**Se obtiene la base de datos */
const db = useFirestore()
const cursos = useCollection(collection(db, 'cursos'))

</script>

<script>

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"
import { useFirestore, useCollection } from 'vuefire'


export default {
  data() {
    return {
       /**Inicializa el usuario null */
      user: null
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
  <main style="display: grid;grid-template-columns: 1fr 1fr;row-gap: 20px;">
    <div v-for="curso in cursos" style="width: 500px;margin-left: 30px; ">

      <div v-if="curso.categoria == $route.params.categoria"
        style="height: 500px;padding: 30px;display: flex;flex-direction: column;justify-content: center;align-items: center;border: 1px solid black;">

        <h3 style="margin-left: 30px;"> {{ curso.nombre }}</h3>
        <img :src='`/src/assets/img/${curso.imagen}`' width="200">

        <p>Duración: {{ curso.horas }} horas</p>
        <p>inscripción: {{ curso.inscripcion }} €</p>

        <router-link
          :to="{ name: 'detalleCurso', params: { id: JSON.stringify(curso) } }"><button>Detalle</button></router-link>

        <template v-if="user">
          <button style="margin-top:10px;">Inscripción</button>
        </template>
      </div>



    </div>


  </main>
</template>
 