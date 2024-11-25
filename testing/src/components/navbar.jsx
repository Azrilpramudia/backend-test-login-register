import { Link } from "react-router-dom";
import { fetchToken, logout } from "./Auth";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">Testing</Link>
        <div>
          {fetchToken() ? (
            <>
              <Link to="/profile" className="mr-4">Profile</Link>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
