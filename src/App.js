import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Nav from "./components/Nav";

function createPost () {
  console.log("createPost was clicked")
  const post = {
    title:"Land a $400k job",
    description:"Finish FrontEndSimplified",
  };
   addDoc(collection(db,"post"), post);
}
   async function getAllPost() {
    const { docs } = await getDocs(collection(db, "post"));
    const posts = docs.map(elem => ({...elem.data(), id: elem.id }));
    console.log(posts);
   }

   async function getPostById() {
  const hardcodedId = "8pblbq1KZl5cVnzL6rZc"; // your real ID
  const postRef = doc(db, "post", hardcodedId);
  const postSnap = await getDoc(postRef);
  console.log(postSnap.data());
}
   


function App() {
  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    console.log("logout clicked")
    signOut(auth);
    console.log("signOut clicked")
  }

  return (
    <div className="App">
      <Nav login={login} logout={logout} register={register} createPost={createPost} getAllPost={getAllPost} getPostById={getPostById} />
    </div>
  );
}

export default App;
