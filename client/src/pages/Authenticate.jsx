import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";

export default function Authenticate() {
  


  const adminRoutes = (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );

  const clientRoutes = (
    <Routes>
      <Route path="/client" element={<ClientDashboard />} />
    </Routes>
  );

  return clientRoutes
}
