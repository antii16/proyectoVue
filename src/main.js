import { createApp } from 'vue'
import App from './App.vue'
import { VueFire, VueFireAuth } from 'vuefire'
//import './assets/main.css'

import HelloWorld from "./components/HelloWorld.vue"
import cabecera from "./components/cabecera.vue"
import pie from "./components/pie.vue"
import registro from "./components/registro.vue"
import privado from "./components/privado.vue"
import detalleCurso from "./components/detalleCurso.vue"
import login from "./components/login.vue"
import cursos from "./components/cursos.vue"

import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"


let estaAutenticado = false;

const routes = [
    { 
        path: '/', 
        component: HelloWorld,
        name: 'HelloWorld'
    },
    { 
      path: '/cursos/:categoria', 
      component: cursos,
      name: 'cursos'
  }, 
    { 
        path: '/cabecera', 
        component: cabecera,
        
    },
    { 
        path: '/pie', 
        component: pie 
    },
    { 
      path: '/detalleCurso/:id', 
      component: detalleCurso,
      name:'detalleCurso'
  },
    { 
      path: '/registro', 
      component: registro,
      meta:{
        isPublic: false
      }
  },
  { 
    path: '/login', 
    component: login,
    meta:{
      isPublic: false
    }
},
  { 
    path: '/privado', 
    component: privado,
   
}

  ]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})


onAuthStateChanged(auth, (user) => {
    if (user) {
    
      const uid = user.uid;
      estaAutenticado = true;
      
    } else {
        estaAutenticado = false;
        router.push("/");
   
    }
  });



const app = createApp(App)


app.use(router)
app.mount('#app')


/*
new Vue({
  el: '#app',
  components:{
  loader:loader
  }
});
*/
//app.use(loader)