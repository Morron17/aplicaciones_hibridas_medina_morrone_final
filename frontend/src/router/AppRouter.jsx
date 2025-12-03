import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Home from "../pages/Home";
import HumanPage from "../pages/HumanPage";
import InfectedPage from "../pages/InfectedPage";
import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/humans"
          element={
            <PrivateRoute>
              <HumanPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/infecteds"
          element={
            <PrivateRoute>
              <InfectedPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}