import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";
import ClientPortal from "./ClientPortal";
import { useEffect, useState } from "react";
import verifyUser from "../lib/verifyUser";
import Unauthorized from "./Unauthorized";

export default function Authenticate() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await verifyUser();
        // TODO: TOASTIFY SUCCESS
        setUser(result);
      } catch (error) {
        // TODO: TOASTIFY ERROR
        navigate("/");
      }
    })();
  }, []);

  const adminRoutes = (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="/admin/clients" element={<ClientPortal />} />
        <Route path="*" element={<Unauthorized />} />
      </Route>
    </Routes>
  );

  const clientRoutes = (
    <Routes>
      <Route path="/client" element={<ClientDashboard />} />
      <Route path="*" element={<Unauthorized />} />
    </Routes>
  );

  if (user?.role === "client") return clientRoutes;
  if (user?.role === "admin") return adminRoutes;

  // return loading component
  return null;
}
