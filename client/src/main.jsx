import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authenticate from "./pages/Authenticate";
import "./index.css";
import LoginPage from "./pages/Login";
import SetPassword from "./pages/SetPassword";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/*" element={<Authenticate />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
