import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

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
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error.message);
    })
   }

     function logout() {
       signOut(auth)
     }
   

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default App;
