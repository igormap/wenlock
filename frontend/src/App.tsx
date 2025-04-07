import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { LayoutAuth } from "./layouts/auth";
import { LayoutDashboard } from "./layouts/dashboard";
import { Home } from "./pages/dashboard/home";
import { UsersPage } from "./pages/dashboard/users";
import { AddUserPage } from "./pages/dashboard/add-user";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutAuth />}>
          <Route index element={<Login />} />
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
