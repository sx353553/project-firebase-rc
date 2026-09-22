import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc } from "firebase/firestore"
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
   addDoc(collection(db,"post"), post)
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
      <Nav login={login} logout={logout} register={register} createPost={createPost} loading />
    </div>
  );
}

export default App;
