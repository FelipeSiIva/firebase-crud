// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANkeMmvZBSqpC0jowezsfkiYjtgNevvxU",
    authDomain: "fire-clud-aulafelipe.firebaseapp.com",
    projectId: "fire-clud-aulafelipe",
    storageBucket: "fire-clud-aulafelipe.appspot.com",
    messagingSenderId: "253259584812",
    appId: "1:253259584812:web:9ac84146881821fbd8c889",
    measurementId: "G-B4KJ0D9JQ6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} nome the title of the Task
 * @param {string} sobrenome the description of the Task
 * @param {int} idade
 * @param {int} CPF 
 * @param {string} profissao
 * @param {string} email
 */
export const saveTask = (nome, sobrenome, idade, CPF, profissao,email) =>
  addDoc(collection(db, "tasks"), { nome, sobrenome, idade, CPF, profissao,email });

  

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 *
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));