import React from "react";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/left1/Logout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";

import { Routes, Route, Navigate } from "react-router-dom";


export default function App() {
  const { authUser, setAuthUser } = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout></Logout>
                <Left></Left>
                <Right></Right>
                 </div>

                 
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/Signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}
