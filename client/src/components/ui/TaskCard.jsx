import { Link } from "react-router";
import UserAvatarGroup from "./UserAvatarGroup";

const TaskCard = ({ project }) => {
  const taskCount = project?.tasks?.length || 0;

  return (
    <Link
      to={`/${project?.slug}`}
      className="group relative w-full bg-black/40 border border-cyan-500/20 rounded-xl p-4 overflow-hidden hover:border-cyan-400 transition"
    >

      {/* SCAN GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />

      {/* HEADER STATUS DOT */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] tracking-widest text-cyan-300">
            PROJECT NODE
          </span>
        </div>

        <div className="text-[10px] text-white/40">
          ID: {project?._id?.slice(-5)}
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
        {project?.title}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-xs text-white/50 mt-1 line-clamp-2">
        {project?.description}
      </p>

      {/* TASK BAR */}
      <div className="mt-4">
        <div className="flex justify-between text-[10px] text-white/40 mb-1">
          <span>TASKS</span>
          <span>{taskCount}</span>
        </div>

        <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
          <div
            className="h-full bg-cyan-400"
            style={{ width: `${Math.min(taskCount * 10, 100)}%` }}
          />
        </div>
      </div>

      {/* MEMBERS */}
      {project?.members?.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <UserAvatarGroup members={project.members} />
          <span className="text-[10px] text-white/40">
            ACTIVE UNITS
          </span>
        </div>
      )}
    </Link>
  );
};

export default TaskCard;
