const express = require("express");
const userController = require("../Controllers/userController");
const projectController = require("../Controllers/projectController");
const jwtMiddleware = require("../Middlewares/jwtMiddleware");
const multerConfig = require("../Middlewares/multerMiddleware");
const router = new express.Router();

//register api
router.post("/register", userController.register);

//login api
router.post("/login", userController.login);

//add project api (this contains a router specific middleware)
router.post(
  "/add-project",
  jwtMiddleware,
  multerConfig.single("projectImage"),
  projectController.addProject
);

//get home projects api
router.get("/get-home-projects", projectController.getHomeProject);

//get all projects api (this contains a router specific middleware)
router.get(
  "/get-all-projects",
  jwtMiddleware,
  projectController.getAllProjects
);

//get user projects api (this contains a router specific middleware)
router.get(
  "/get-user-projects",
  jwtMiddleware,
  projectController.getUserProjects
);

//update projects
router.put("/project/edit/:pid",jwtMiddleware,multerConfig.single("projectImage"),projectController.editProject);

//update profile
router.put("/user/edit",jwtMiddleware,multerConfig.single("profile"),userController.editUser);

//remove projects
router.delete("/remove-project/:pid",jwtMiddleware,projectController.removeProject)

module.exports = router;
