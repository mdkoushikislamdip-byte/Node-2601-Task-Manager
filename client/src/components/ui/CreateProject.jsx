import { useState } from "react";
import {
  useCreateProjectMutation,
  useGetProjectListQuery,
} from "../../services/api";

import Input from "./Input";
import Button from "./Button";

const CreateProject = ({ modal }) => {
  const { refetch } = useGetProjectListQuery();

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [createProject] = useCreateProjectMutation();

  // ================= CREATE PROJECT =================
  const handelCreate = async (e) => {
    e.preventDefault();

    if (!projectData.title || !projectData.description) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await createProject(projectData);

      if (res.error) {
        console.log(res.error);
        alert("Something went wrong");
        return;
      }

      refetch();

      setProjectData({
        title: "",
        description: "",
      });

      modal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      {/* ================= MODAL ================= */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Create Project
          </h2>

          <button
            onClick={() => modal(false)}
            className="text-black text-2xl hover:rotate-90 transition duration-300"
          >
            ✕
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handelCreate}
          className="p-6 text-black space-y-5"
        >

          <Input
          className="text-black"
            label="Project Title"
            type="text"
            placeholder="Enter project title"
            value={projectData.title}
            onChange={(e) =>
              setProjectData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />

          <div>
            <label className="text-sm font-medium text-black mb-2 block">
              Project Description
            </label>

            <textarea
              placeholder="Enter project description"
              value={projectData.description}
              onChange={(e) =>
                setProjectData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full border border-black text-black rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
            />
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={() => modal(false)}
              className="w-full border border-black py-3 rounded-xl hover:bg-gray-100 transition font-medium"
            >
              <span className="text-black text-xl">Cancel</span>
            </button>

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;