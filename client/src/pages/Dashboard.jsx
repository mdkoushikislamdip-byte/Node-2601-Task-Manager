import { useState } from "react";
import { Navigate } from "react-router";

import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import CreateProject from "../components/ui/CreateProject";
import TaskCard from "../components/ui/TaskCard";
import Navbar from "../components/ui/Navbar";

import {
  useGetProfileQuery,
  useGetProjectListQuery,
} from "../services/api";
import MenuBar from "../components/ui/MenuBar";

const Dashboard = () => {
  const { data, isLoading } = useGetProfileQuery();
  const { data: projectList, isLoading: projectLoading } = useGetProjectListQuery();

  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  if (isLoading || projectLoading) return <Loader />;
  if (!data) return <Navigate to="/login" />;

  const projects = projectList?.projects || [];

  const filtered = projects
    .filter((p) => (filter === "all" ? true : p.status === filter))
    .filter((p) => p.title?.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#05070B] text-[#D6F7FF] font-mono relative overflow-hidden">

      {/* ================= GRID BACKGROUND (ROBOTIC MATRIX) ================= */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* ================= SCANLINE EFFECT ================= */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,255,255,0.03),transparent)] animate-pulse" />

      {/* ================= TOP BAR ================= */}
      <div className="relative z-10 border-b border-cyan-500/20 bg-black/40 backdrop-blur">
        <Navbar />
      </div>

      {/* ================= SYSTEM HEADER ================= */}
      <div className="relative z-10 px-6 pt-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <p className="text-cyan-400 text-xs tracking-widest">
              [SYSTEM ACTIVE]
            </p>
            <h1 className="text-3xl font-bold tracking-[0.3em] uppercase">
              PROJECT CONTROL UNIT
            </h1>
            <p className="text-white/40 text-sm mt-1">
              managing project execution matrix
            </p>
          </div>

          {/* STATUS CORE */}
          <div className="flex gap-2">
            <div className="border border-cyan-500/30 bg-black/40 px-4 py-2 rounded">
              <p className="text-[10px] text-white/40">TOTAL</p>
              <p className="text-cyan-300 font-bold">{projects.length}</p>
            </div>
            <div className="border border-green-500/30 bg-black/40 px-4 py-2 rounded">
              <p className="text-[10px] text-white/40">ACTIVE</p>
              <p className="text-green-300 font-bold">
                {projects.filter(p => p.status === "active").length}
              </p>
            </div>
            <div className="border border-pink-500/30 bg-black/40 px-4 py-2 rounded">
              <p className="text-[10px] text-white/40">DONE</p>
              <p className="text-pink-300 font-bold">
                {projects.filter(p => p.status === "completed").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMMAND INPUT ================= */}
      <div className="relative z-10 px-6 mt-6 flex gap-2 items-center">
        <div className="flex-1 border border-cyan-500/20 bg-black/40 rounded px-3 py-2 flex items-center">
          <span className="text-cyan-400 text-xs mr-2">&gt;</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search project data..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        <Button
          onClick={() => setModal(true)}
          className="bg-cyan-500 text-black font-bold px-4 py-2 rounded"
        >
          + Create Project
        </Button>
      </div>

      {/* ================= FILTER TERMINAL ================= */}
      <div className="relative z-10 px-6 mt-4 flex gap-2 overflow-x-auto">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 border text-xs tracking-widest rounded transition
              ${filter === f
                ? "bg-cyan-500 text-black border-cyan-400"
                : "border-cyan-500/20 text-cyan-200"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ================= PROJECT GRID (ROBOT NODES) ================= */}
      <div className="relative z-10 px-6 mt-8 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center text-cyan-500/40 py-20">
            // NO DATA FOUND IN MATRIX
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((project) => (
              <div
                key={project._id}
                className="border border-cyan-500/20 bg-black/40 rounded p-3 hover:border-cyan-400 transition"
              >
                <TaskCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= CORE BUTTON ================= */}
      <div className="fixed bottom-6 right-6 z-50">
    <MenuBar />
      </div>

      {modal && <CreateProject modal={(m) => setModal(m)} />}

    </div>
  );
};

export default Dashboard;