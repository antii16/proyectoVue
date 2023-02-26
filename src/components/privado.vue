<script setup>
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"
import { ref } from "vue"
import { getStorage, ref as ref2, uploadBytes, getDownloadURL } from "firebase/storage";

import { useFirestore, useCollection } from 'vuefire'
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore'


let file = ref("")
let nombre = ref("")
let categoria = ref("")
let horas = ref("")
let inscripcion = ref("")



function subirArchivo() {
  /**Sube archivo al storage */
  const storage = getStorage();
  const storageRef = ref2(storage, file.value.files[0].name);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file.value.files[0]).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    getDownloadURL(storageRef)
      .then((url) => {

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
          console.log(url)
        };
        xhr.open('GET', url);
        xhr.send();
      })
  });
}

const db = useFirestore()
const cursos = useCollection(collection(db, 'cursos'))


function crearCurso() {
  /**
   * Añade los cursos a la base de datos
   */
  addDoc(collection(db, "cursos"), {
    nombre: nombre.value,
    categoria: categoria.value,
    horas: horas.value,
    imagen: imagen.value,
    inscripcion: inscripcion.value
  });
}

function borrarCurso(id) {
  /**Se le pasa el id del curso 
   * y lo elimina de la base de datos
   */
  console.log(id)
  deleteDoc(doc(db, "cursos", id));
}
</script>

<template>
  <h1>Lista de Cursos</h1>

  <h2></h2>
  <table>
    <tr>
      <th> Nombre </th>
      <th>Descripcion</th>
      <th> Categoría </th>
      <th> Horas </th>
      <th> Incripción </th>
      <th>Opción</th>

    </tr>

    <tr v-for="curso in cursos" :key="curso.id">
      <td> {{ curso.nombre }}</td>
      <td> {{ curso.descripcion }}</td>
      <td> {{ curso.categoria }}</td>
      <td> {{ curso.horas }} </td>
      <td> {{ curso.inscripcion }}€</td>
      <td>

        <button @click="borrarCurso(curso.id)"> Borrar</button>


      </td>
    </tr>
  </table>

  <p>

    <button @click="crearCurso"> Crear Curso</button>
  </p>


  <h3>Crear Curso</h3>

  <p>
    <label for="nombre">Nombre: </label>
    <input type="text" v-model="nombre">
  </p>

  <p>
    <label for="horas">Horas: </label>
    <input type="text" v-model="horas">
  </p>

  <p>
    <label for="imagen">Imagen: </label>
    <input type="file" name="imagen" ref="file" @change="subirArchivo">
  </p>

  <p>
    <label for="imagen">PDF: </label>
    <input type="file" name="imagen" ref="file" @change="subirArchivo">
  </p>

  <p>
    <label for="inscripcion">Inscripcion: </label>
    <input type="text" v-model="inscripcion">
  </p>
</template>