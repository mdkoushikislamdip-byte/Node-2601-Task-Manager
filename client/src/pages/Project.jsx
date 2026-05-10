import { useGetProjectDetailsQuery } from "../services/api";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const ProjectPage = () => {
  const { data: project } = useGetProjectDetailsQuery("e-commerce");
  const navigate = useNavigate();

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  return (
    <div className="min-h-screen bg-[#050814] text-cyan-100 py-10 px-4 relative">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-5 py-3 rounded-lg border border-cyan-400 text-cyan-300
        hover:bg-cyan-400 hover:text-black transition shadow-[0_0_25px_#22d3ee30]"
      >
        ◀ SYSTEM BACK
      </button>

      {/* MAIN CONTENT */}
      <div
        className={`max-w-6xl mx-auto transition duration-300 ${
          showAddMemberModal || showAddTaskModal || showAssignModal
            ? "blur-sm pointer-events-none"
            : ""
        }`}
      >

        {/* HEADER */}
        <div className="bg-[#0b1220] border border-cyan-500/20 rounded-2xl p-6 mb-8">

          <h1 className="text-3xl font-bold text-cyan-300">
            {project?.title}
          </h1>

          <p className="text-gray-400 mt-2">
            {project?.description}
          </p>

          <div className="flex gap-3 mt-4 flex-wrap">

            <span className="px-3 py-1 rounded-md border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-xs">
              MEMBERS: {project?.members?.length || 0}
            </span>

            <span className="px-3 py-1 rounded-md border border-purple-400/30 bg-purple-500/10 text-purple-300 text-xs">
              TASKS: {project?.tasks?.length || 0}
            </span>

          </div>

          <div className="flex gap-3 flex-wrap mt-6">

            <button
              onClick={() => setShowAddMemberModal(true)}
              className="px-5 py-2 rounded-md border border-green-400 text-green-300
              hover:bg-green-400 hover:text-black transition"
            >
              + ADD MEMBER
            </button>

            <button
              onClick={() => setShowAddTaskModal(true)}
              className="px-5 py-2 rounded-md border border-white/30 text-white
              hover:bg-white hover:text-black transition"
            >
              + ADD TASK
            </button>

          </div>
        </div>

        {/* MEMBERS */}
        <div className="bg-[#0b1220] border border-cyan-500/20 rounded-2xl p-6 mb-8">

          <h2 className="text-xl text-cyan-300 mb-4">
            PROJECT MEMBERS
          </h2>

          <div className="flex flex-wrap gap-3">

            {project?.members?.map((member, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5"
              >
                <p className="text-cyan-200 text-sm">
                  {member?.fullName}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* TASKS */}
        <h2 className="text-xl text-cyan-300 mb-4">
          SYSTEM TASK
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {project?.tasks?.map((task) => (
            <div
              key={task?._id}
              className="bg-[#0b1220] border border-cyan-500/20 rounded-2xl p-5"
            >

              <div className="flex justify-between">

                <h3 className="text-cyan-200 font-semibold">
                  {task?.title}
                </h3>

                <span className="text-xs px-2 py-1 border border-white/20 rounded-md">
                  {task?.priority}
                </span>

              </div>

              <p className="text-gray-400 mt-3 text-sm">
                {task?.description}
              </p>

              <div className="mt-5 flex justify-between items-center">

                <span className={`text-xs font-semibold ${
                  task?.isComplete ? "text-green-400" : "text-orange-400"
                }`}>
                  {task?.isComplete ? "COMPLETE" : "ACTIVE"}
                </span>

                <button
                  onClick={() => {
                    setSelectedTaskId(task._id);
                    setShowAssignModal(true);
                  }}
                  className="text-xs px-3 py-1 border border-indigo-400 text-indigo-300 hover:bg-indigo-400 hover:text-black transition"
                >
                  ASSIGN
                </button>

              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* ADD MEMBER */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-[#0b1220] border border-cyan-500/30 p-6 rounded-2xl w-full max-w-md relative">

            <button
              onClick={() => setShowAddMemberModal(false)}
              className="absolute top-3 right-3 text-cyan-300 hover:text-red-400"
            >
              ✕
            </button>

            <h2 className="text-cyan-300 mb-4">ADD MEMBER</h2>

            <input
              type="text"
              placeholder="ENTER MEMBER ID"
              className="w-full bg-black border border-cyan-500/30 px-4 py-3 rounded text-cyan-200"
            />

            <button className="w-full mt-4 border border-green-400 text-green-300 py-2 hover:bg-green-400 hover:text-black transition">
              EXECUTE
            </button>

          </div>
        </div>
      )}

      {/* ADD TASK */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-[#0b1220] border border-cyan-500/30 p-6 rounded-2xl w-full max-w-md relative">

            <button
              onClick={() => setShowAddTaskModal(false)}
              className="absolute top-3 right-3 text-cyan-300 hover:text-red-400"
            >
              ✕
            </button>

            <h2 className="text-cyan-300 mb-4">CREATE TASK</h2>

            <input className="w-full bg-black border border-cyan-500/30 px-4 py-3 rounded text-cyan-200 mb-3" />

            <textarea className="w-full bg-black border border-cyan-500/30 px-4 py-3 rounded text-cyan-200 mb-3 h-28" />

            <select className="w-full bg-black border border-cyan-500/30 px-4 py-3 rounded text-cyan-200 mb-3">
              <option>Select Priority</option>
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>

            <button className="w-full border border-white/30 text-white py-2 hover:bg-white hover:text-black transition">
              DEPLOY TASK
            </button>

          </div>
        </div>
      )}

      {/* ASSIGN */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-[#0b1220] border border-cyan-500/30 p-6 rounded-2xl w-full max-w-md relative">

            <button
              onClick={() => setShowAssignModal(false)}
              className="absolute top-3 right-3 text-cyan-300 hover:text-red-400"
            >
              ✕
            </button>

            <h2 className="text-cyan-300 mb-4">ASSIGN MEMBER</h2>

            <select className="w-full bg-black border border-cyan-500/30 px-4 py-3 rounded text-cyan-200 mb-3">

              <option>Select</option>

              {project?.members?.map((member, index) => (
                <option key={index}>
                  {member?.fullName}
                </option>
              ))}

            </select>

            <button className="w-full border border-cyan-400 text-cyan-300 py-2 hover:bg-cyan-400 hover:text-black transition">
              EXECUTE
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectPage;