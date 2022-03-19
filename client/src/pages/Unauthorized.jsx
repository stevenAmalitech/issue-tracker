import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Unauthorized() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-8xl font-extrabold mb-10">Unauthorized</h1>
      <Link to="/">
        <Button text="home" />
      </Link>
    </div>
  );
}
