export default function AdminLoginPage() {
    return <div className="flex justify-center items-center" style={{height: "83vh"}}>
      <div>
        <div className="text-center">
          <div className="flex justify-center"><img src="/iium.png" alt="" className="h-20"/></div>
          <p>KICT</p>
          <p className="text-3xl font-semibold pb-7">Administrator Login Page</p>
        </div>
        <form action="/">
          <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs block mb-5" />
          <input type="text" placeholder="Password" className="input input-bordered w-full max-w-xs block mb-5" />
          <div className="flex justify-center"><a href="/admin-panel"><button className="btn btn-primary">Log in</button></a></div>
        </form>
      </div>
  
    </div>;
  }
  