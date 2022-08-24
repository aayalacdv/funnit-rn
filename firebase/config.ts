import '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { initializeApp }from '@firebase/app'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAwyPrv3ZhnMMD1oTe7wSFfDIk2XEotqPc",
  authDomain: "todo-list-app-41358.firebaseapp.com",
  projectId: "todo-list-app-41358",
  storageBucket: "todo-list-app-41358.appspot.com",
  messagingSenderId: "192578606664",
  appId: "1:192578606664:web:1adbf08360a7dfa9f16a7d"
};

const firebase = initializeApp(firebaseConfig)
const firestore = getFirestore(firebase)
const auth = getAuth(firebase)

export { firebase, firestore, auth};