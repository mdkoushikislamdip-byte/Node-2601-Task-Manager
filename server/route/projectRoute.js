const express = require("express");
const { createProject, projectList, addTeamMemberToProject, addTaskToProject, projectDetails } = require("../controllers/projectcontroller");
const router = express.Router();

router.post("/create", createProject);
router.get("/list", projectList);
router.get("/details/:slug", projectDetails);
router.post("/addmember", addTeamMemberToProject)
router.post("/addtask", addTaskToProject)

module.exports = router;