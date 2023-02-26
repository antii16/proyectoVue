import { initializeApp  } from 'firebase/app'
//import { getFirestore } from "firebase/firestore";

//MAS ADELANTE
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



export const firebaseApp = initializeApp({
   
    apiKey: "AIzaSyAvFlwrBLREgELVtd69KHVNSsXM2lmq-84",
    authDomain: "cursosonline-11627.firebaseapp.com",
    projectId: "cursosonline-11627",
    storageBucket: "cursosonline-11627.appspot.com",
    messagingSenderId: "794070539686",
    appId: "1:794070539686:web:a554b5528a54c156c80367"
     
})

//MAS ADELANTE
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);



