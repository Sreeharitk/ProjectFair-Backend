const projects = require("../Models/projectModel");

//add projects
exports.addProject = async (req, res) => {
  console.log("Inside Add project API");
  const userID = req.payload;
  const { title, languages, overview, github, website } = req.body;
  const projectImage = req.file.filename;
  // console.log(title,languages,overview,github,website,projectImage,userID);
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("Project already exists!! add another repository!!");
    } else {
      const newProject = new projects({
        title,
        languages,
        overview,
        github,
        website,
        projectImage,
        userID,
      });

      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

//get home projects
exports.getHomeProject = async (req, res) => {
  try {
    const homeProjects = await projects.find().limit(3);
    res.status(200).json(homeProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

//get all projects
exports.getAllProjects = async (req, res) => {
  //method to get query params from url, here "search" is the key we store our quering items in
  const searchKey = req.query.search;
  //we implement regex in mongoDB to match two strings
  const query = {
    languages: {
      $regex: searchKey,
      $options: "i",
    },
  };
  try {
    const allProjects = await projects.find(query);
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

//get user projects
exports.getUserProjects = async (req, res) => {
  const userID = req.payload;
  try {
    const userProjects = await projects.find({ userID });
    res.status(200).json(userProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

//edit projects
exports.editProject = async (req, res) => {
  // console.log("inside edit project api");
  //req.params is inbuilt method to extract any url params.
  const { pid } = req.params;
  const userID = req.payload;
  const { title, languages, overview, github, website, projectImage } =
    req.body;
  const uploadImage = req.file ? req.file.filename : projectImage;
  try {
    //updating query order must be same as model order
    const updatedProject = await projects.findByIdAndUpdate(
      { _id: pid },
      {
        title,
        languages,
        overview,
        github,
        website,
        projectImage: uploadImage,
        userID,
      },
      { new: true }
    );
    await updatedProject.save();
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(401).json(err);
  }
};

//remove projects
exports.removeProject = async (req, res) => {
  const { pid } = req.params;
  try {
    const projectDetails = await projects.findByIdAndDelete({ _id: pid });
    res.status(200).json(projectDetails);
  } catch (err) {
    res.status(401).json(err);
  }
};
