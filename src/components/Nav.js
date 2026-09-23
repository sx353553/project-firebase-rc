import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/init";

function Nav({ login, logout, register, createPost, getAllPost, getPostById, getPostByUid, updatePost, hardcodedId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state changed", currentUser);
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <nav>
      {loading ? (
        <div className="skeleton-circle"></div>
      ) : user ? (
        <>
        <div className="avatar-circle" onClick={logout}>
          {user.email[0].toUpperCase()}
        </div>
        <button onClick={createPost}>Create Post </button>
        <button onClick={getAllPost}>Get All Post</button>
        <button onClick={getPostById(hardcodedId)}>Get Post By Id</button>
        <button onClick={getPostByUid}>Get Post By Uid</button>
        <button onClick={updatePost}>Update Post</button>
        </>
      ) : (
        <div>
          <button onClick={login}>login</button>
          <button onClick={register}>Register</button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
