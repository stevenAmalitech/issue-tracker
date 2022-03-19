import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import getProjects from "../lib/getProjects";

export default function AdminDashboard() {
  useEffect(() => {
    (async () => {
      const data = await getProjects();
    })();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
