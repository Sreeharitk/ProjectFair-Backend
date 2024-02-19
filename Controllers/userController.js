const users = require("../Models/userModel");
const jwt = require("jsonwebtoken");

//register
exports.register = async (req, res) => {
  // console.log("Inside REGISTER API");
  const { username, email, password } = req.body;
  // console.log(username, email, password);
  try {
    const existingUser = await users.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      res.status(406).json("Acount already exists!!");
    } else {
      //we are creating a object for user model since we want to post the user data with specific structure in database
      const newUser = new users({
        username,
        email,
        password,
        profile: "",
        github: "",
        linkedin: "",
      });
      //this method is used instead of insert one to insert data to database
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

//login
exports.login = async (req, res) => {
  console.log("Inside LOGIN API");
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const existingUser = await users.findOne({ email, password });
    // console.log(existingUser);
    if (existingUser) {
      //creating a token
      const token = jwt.sign(
        { userID: existingUser._id },
        process.env.JWT_SECRET_KEY
      );
      res.status(200).json({ existingUser, token });
    } else {
      res.status(404).json("Invalid Username or Password!");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

//update profile
exports.editUser = async (req, res) => {
  const userId = req.payload;
  const { username, password, email, github, linkedin, profile } = req.body;
  const profileImage = req.file ? req.file.filename : profile;
  try {
    const updateUser = await users.findByIdAndUpdate(
      { _id: userId },
      {
        username,
        email,
        password,
        profile: profileImage,
        github,
        linkedin,
      },
      { new: true }
    );
    await updateUser.save();
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(401).json(err);
  }
};
