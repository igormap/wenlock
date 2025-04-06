import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { LayoutAuth } from "./layouts/auth";
import { LayoutDashboard } from "./layouts/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutAuth />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="dash" element={<LayoutDashboard />}>
          <Route index element={<div />} />
          <Route path="users" element={<div />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
