import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import des pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const isLoggedIn = window.localStorage.getItem('isLogged'); // Vrai si l'utilisateur est connecté
  const isAdmin = window.localStorage.getItem('x-user-admin');
  const token = window.localStorage.getItem('token');

  return (
    <>
      <Router>
        <Routes>
          {/* Si l'utilisateur n'est pas connecté */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Routes protégées : accessible seulement si l'utilisateur est connecté */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Pages non trouvées */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
