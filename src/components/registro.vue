<script setup>
import { ref } from "vue"
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../firebase"

let usuario = ref(""), contrasena = ref("");


function altaUsuario() {
    /**Realiza el registro del usuario */
    createUserWithEmailAndPassword(auth, usuario.value, contrasena.value)
        .then((userCredential) => {
            const user = userCredential.user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
}


</script>

<template>
    <h1>Registro</h1>
    <p>
        Usuario: <input type="text" v-model="usuario">
    </p>
    <p>
        Password: <input type="password" v-model="contrasena">
    </p>
    <button @click="altaUsuario">Registrarse</button>
</template>