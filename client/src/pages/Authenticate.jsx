import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import ClientDashboard from "./ClientDashboard";
import ClientPortal from "./ClientPortal";
import { useEffect, useState } from "react";
import verifyUser from "../lib/verifyUser";
import Unauthorized from "./Unauthorized";
import IssuePortal from "./IssuePortal";

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

  const routes = (
    <Routes>
      <Route path="/client" element={<ClientDashboard />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="/admin/clients" element={<ClientPortal />} />
        <Route path="/admin/issues" element={<IssuePortal />} />
        <Route path="*" element={<Unauthorized />} />
      </Route>
    </Routes>
  );

  // return loading component
  if (!user.role) return null;

  return routes;
}
