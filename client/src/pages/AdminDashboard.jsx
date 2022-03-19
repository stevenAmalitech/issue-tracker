import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
