import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import { LayoutAuth } from "./layouts/auth";
import { LayoutDashboard } from "./layouts/dashboard";

import { Login } from "./pages/auth/Login";
import { PasswordRecovery } from "./pages/auth/PasswordRecovery";

import { Home } from "./pages/dashboard/home";
import { UsersPage } from "./pages/dashboard/users";
import { AddUserPage } from "./pages/dashboard/add-user";

import { Toaster } from "./components/ui/sonner";
import { JSX } from "react";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();

  if (loading) {
    // Pode trocar isso por um spinner ou tela de carregamento bonita
    return <div>Carregando...</div>;
  }

  return token ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route element={<LayoutAuth />}>
        <Route index element={<Login />} />
        <Route path="password-recovery" element={<PasswordRecovery />} />
      </Route>

      {/* Rotas privadas */}
      <Route
        path="/dash"
        element={
          <PrivateRoute>
            <LayoutDashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="user-form" element={<AddUserPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" duration={2000} />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
