<script setup>

import { ref } from "vue"
import { getStorage, ref as ref2, uploadBytes, getDownloadURL } from "firebase/storage";

const file = ref("")

function descargarPDF() {
  /**Descarga el PDF  */
  const storage = getStorage();
  getDownloadURL(ref(storage, 'images/stars.jpg'))
    .then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

    })
    .catch((error) => {
      // Handle any errors
    });
}

</script>

<script>

export default {
  data() {
    return {
      curso: JSON.parse(this.$route.params.id)
    }
  }
}

</script>

<template>
  <main>

    <h1 style="margin-left: 30px;"> {{ curso.nombre }}</h1>

    <div style="display:flex;justify-content: center;align-items: center; width: 600px;">
      <img style="padding: 40px;" :src='`/src/assets/img/${curso.imagen}`' width="250">

      <p>{{ curso.descripcion }}</p>

    </div>

    <div style="display:flex;justify-content: center;align-items: center; width: 600px;">

      <p><b>Duración: </b>{{ curso.horas }} horas</p>
      <p style="padding: 40px;"><b>Inscripción: </b>{{ curso.inscripcion }} €</p>
      <p>
        <button @click="descargarPDF">Descargar PDF</button>
      </p>
    </div>
  </main>
</template>