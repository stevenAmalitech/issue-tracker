import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";
import ClientPortal from "./ClientPortal";

export default function Authenticate() {
  const adminRoutes = (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="/admin/clients" element={<ClientPortal />} />
      </Route>
    </Routes>
  );

  const clientRoutes = (
    <Routes>
      <Route path="/client" element={<ClientDashboard />} />
    </Routes>
  );

  return adminRoutes;
}
