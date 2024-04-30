import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex justify-center mt-28 text-center">
      <div>
        <h1 className="text-5xl">404 Not Found</h1>
        <Link to={"/"} className="underline text-slate-400">Home</Link>
      </div>
    </div>
  );
}
