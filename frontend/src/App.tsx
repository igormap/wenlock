import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { LayoutAuth } from "./layouts/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutAuth />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
