import { useGetProfileQuery } from "../../services/api";

const Navbar = () => {
  const { data: user } = useGetProfileQuery();

  const initial = user?.fullName?.charAt(0)?.toUpperCase();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/10 text-white">

      <div className="container flex items-center justify-between py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Task<span className="text-cyan-400">Manager</span>
        </h1>

        {/* Profile */}
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition border border-white/10">

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-cyan-400/40 overflow-hidden flex items-center justify-center font-semibold text-cyan-300">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              initial
            )}
          </div>

          {/* Info */}
          <div className="leading-tight">
            <p className="text-[11px] text-white/50">Welcome</p>
            <p className="text-sm font-medium">
              {user?.fullName || "User"}
            </p>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;