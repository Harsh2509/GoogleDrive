// import React from "react";

import { AuthProvider } from "../context/AuthContext";
import { Signup } from "./authentication/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./authentication/Login";
import { PrivateRoute } from "./authentication/PrivateRoute";
import Profile from "./authentication/Profile";
import { ForgotPassword } from "./authentication/ForgotPassword";
import { Dashboard } from "./google-drive/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/user",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/folder/:folderId",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
