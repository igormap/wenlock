import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { LayoutAuth } from "./layouts/auth";
import { LayoutDashboard } from "./layouts/dashboard";
import { Home } from "./pages/dashboard/home";
import { UsersPage } from "./pages/dashboard/users";
import { AddUserPage } from "./pages/dashboard/add-user";
import { Toaster } from "./components/ui/sonner";
import { PasswordRecovery } from "./pages/auth/PasswordRecovery";

function App() {
  return (
    <BrowserRouter>
      <Toaster duration={10000} position="top-right" offset={60} />
      <Routes>
        <Route element={<LayoutAuth />}>
          <Route index element={<Login />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
        </Route>
        <Route path="dash" element={<LayoutDashboard />}>
          <Route index element={<Home />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="add-user" element={<AddUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
