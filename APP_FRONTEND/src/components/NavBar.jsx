import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const NavBar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => logout();

  return (
    <header className=" bg-[#3a1b56ef] opacity-120 font-vt323 flex lg:text-4xl justify-around  text-white p-4 font-arial">
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className="lg:text-4xl hover:text-[#9b57d6dd] transition-all duration-300"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
      {/* <span className="hidden lg:block"> The Diary App</span> */}

      {user ? (
        <div className="flex flex-row gap-20">
          <span className="lg:text-4xl">Welcome, {user.email}</span>
          <button
            onClick={handleClick}
            className="lg:text-4l hover:text-[#9b57d6dd] transition-all duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-row gap-3 lg:text-4xl lg:gap-10  ">
          <Link
            to="/api/login"
            className="hover:text-[#9b57d6dd] transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/api/signup"
            className="hover:text-[#9b57d6dd] transition-all duration-300"
          >
            Signup
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
