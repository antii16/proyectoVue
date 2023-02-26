<script setup>
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth } from "../firebase"


</script>

<script>

export default {
    data() {
        return {
            usuario: '',
            contrasena: ''
        }
    },
    name: 'login',
    methods: {
        loginUsuario() {
            /**Realiza el login del usuario. Si se ha logueado
             * redirige al home
             */
            signInWithEmailAndPassword(auth, this.usuario, this.contrasena)
                .then((userCredential) => {
                    this.$router.push({ name: 'HelloWorld' })
                    const user = userCredential.user;

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        },

        loginGoogle() {
            /**Realiza el login del con cuenta de google. Si se ha logueado
             * redirige al home
             */
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                this.$router.push({ name: 'HelloWorld' })
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

        });
    }

    },

    

}

</script>

<template>
    <h1>Login</h1>
    <p>
        Usuario: <input type="text" v-model="usuario">
    </p>
    <p>
        Password: <input type="password" v-model="contrasena">
    </p>
    <p>
        <button @click="loginUsuario">Login</button> |
        <button @click="loginGoogle">Google</button>
    </p>
</template>