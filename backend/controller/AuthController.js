const {UserModel} = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");


module.exports.Signup = async (req, res, next) => {
  console.log("📦 Incoming body:", req.body);
  try {
    const { name, email, password, username, phone, createdAt } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await UserModel.create({ name, email, password, username, phone, createdAt });

    console.log(user);
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed", error });
  }
};