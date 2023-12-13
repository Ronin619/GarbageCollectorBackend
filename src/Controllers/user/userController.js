const User = require("../../Models/usersModel");
const jwt = require("jsonwebtoken");

// Generate jwt token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// Get: all Users
const findAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
};

// Post: Register new User
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    // create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// Post: Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// Delete a User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(400).json({ error: "user does not exist." });
  }
  res.status(200).json(user);
};

module.exports = { registerUser, findAllUsers, deleteUser, loginUser };
