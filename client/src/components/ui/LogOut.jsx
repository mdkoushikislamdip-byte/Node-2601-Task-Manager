import { useNavigate } from "react-router";

const LogOut = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth data (adjust based on your app)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 rounded-md border border-red-400 text-red-300
      hover:bg-red-500 hover:text-white transition ${className}`}
    >
      Log out
    </button>
  );
};

export default LogOut;