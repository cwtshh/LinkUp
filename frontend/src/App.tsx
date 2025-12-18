import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import BaseLayout from "./components/BaseLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BaseLayout>
  );
}

export default App;
