import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Nav from "./components/Nav";

const hardcodedId = "8pblbq1KZl5cVnzL6rZc";

function createPost() {
  console.log("createPost was clicked");
  const post = {
    title: "Land a $400k job",
    description: "Finish FrontEndSimplified",
  };
  addDoc(collection(db, "post"), post);
}

async function getAllPost() {
  const { docs } = await getDocs(collection(db, "post"));
  const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
  console.log(posts);
}

async function getPostById(id) {
  const postRef = doc(db, "post", id);
  const postSnap = await getDoc(postRef);
  return postSnap.data();
}

async function getPostByUid() {
  const postCollectionRef = query(
    collection(db, "post"),
    where("uid", "==", "1"),
  );
  const { docs } = await getDocs(postCollectionRef);
  console.log(docs.map((doc) => doc.data()));
}

async function updatePost() {
  console.log("updatePost clicked");
  const postRef = doc(db, "post", hardcodedId);
  console.log("postRef created", postRef);
  const post = await getPostById(hardcodedId);
  console.log("post fetched:", post);
  const newPost = {
    ...post,
    title: "Land a $500k job",
  };
  console.log("newPost built:", newPost);
  updateDoc(postRef, newPost)
    .then(() => console.log("update successful"))
    .catch((error) => console.log("update failed:", error));
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
    console.log("logout clicked");
    signOut(auth);
    console.log("signOut clicked");
  }

  return (
    <div className="App">
      <Nav
        login={login}
        logout={logout}
        register={register}
        createPost={createPost}
        getAllPost={getAllPost}
        getPostById={getPostById}
        getPostByUid={getPostByUid}
        updatePost={updatePost}
        hardcodedId={hardcodedId}
      />
    </div>
  );
}

export default App;