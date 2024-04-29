export default function LoginPage() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "83vh" }}
    >
      <div>
        <div className="text-center">
          <div className="flex justify-center">
            <img src="/iium.png" alt="" className="h-20" />
          </div>
          <p>KICT</p>
          <p className="text-3xl font-semibold pb-7">Online Food Order</p>
        </div>
        <form action="http://localhost:8081/api/login" method="post">
          <input
            type="text"
            placeholder="Matric number"
            className="input input-bordered w-full max-w-xs block mb-5"
            name="matricNo"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs block mb-5"
            name="password"
          />
          <div className="flex justify-center">
            <button className="btn btn-primary">Log in</button>
          </div>
          <div className="flex justify-center text-slate-500 mt-3">
            Do not have an account? &#160;<span><a href="/register" className="underline text-slate-400 hover:opacity-80">Register here</a></span>
          </div>
        </form>
        <div className="flex justify-center">
          <a href="/"><button className="btn btn-danger bg-red-600 mt-10">Bypass login</button></a>
        </div>
      </div>
    </div>
  );
}
