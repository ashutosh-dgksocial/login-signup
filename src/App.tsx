import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./sections/Login/Login";
import Signup from "./sections/Signup/Signup";
import Home from "./sections/Home/Home";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
