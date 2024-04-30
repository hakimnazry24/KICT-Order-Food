import { Link } from "react-router-dom";

export default function SuccessfulRegisterPage() {
  return (
    <div
      className="flex justify-center items-center text-center"
      style={{ height: "90vh" }}
    >
      <div>
        <p className="text-4xl font-semibold mb-2 text-white">Congratulations!</p>
        <p>
          You have successfully created an account. Please log using the newly
          created credentials
        </p>
      <Link to={"/"}><button className="btn btn-accent px-10 text-lg mt-8">Login</button></Link>
      </div>
    </div>
  );
}
