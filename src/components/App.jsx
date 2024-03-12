// import React from "react";

import { AuthProvider } from "../context/AuthContext";
import { Signup } from "./Signup";
import { Container } from "react-bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./Login";
import { PrivateRoute } from "./PrivateRoute";
import Dashboard from "./Dashboard";
import { ForgotPassword } from "./ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
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
]);

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <RouterProvider router={router}></RouterProvider>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
