import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";




const MenuBar = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 border border-cyan-400 bg-black text-cyan-300 rounded"
      >
        ⊕
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute bottom-full mb-2 right-0 w-56 bg-black border border-cyan-500/30 rounded-lg shadow-lg">
          
          <div className="px-3 py-2 border-b border-cyan-500/20 text-xs text-gray-400">
            
            <div className="text-cyan-300"> {user?.fullName || "User"}</div>
          </div>

          {/* <div className="px-3 py-2 hover:bg-cyan-500 hover:text-black cursor-pointer">
            Add Task
          </div>

          <div className="px-3 py-2 hover:bg-cyan-500 hover:text-black cursor-pointer">
            Create Project
          </div> */}

         <div
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setOpen(false);
    navigate("/login");
  }}
  className="px-3 py-2 text-red-400 hover:bg-red-500 hover:text-white cursor-pointer"
>
  Log out
</div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;