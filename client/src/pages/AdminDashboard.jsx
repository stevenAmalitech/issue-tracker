import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import getProjects from "../lib/getProjects";

export const AdminContext = React.createContext();

export function useAdminData() {
  return useContext(AdminContext);
}

export default function AdminDashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const projects = await getProjects();
      setData({ ...data, projects });
    })();
  }, []);

  return (
    <AdminContext.Provider value={[data, setData]}>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </AdminContext.Provider>
  );
}
