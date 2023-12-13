const mongoose = require("mongoose");
const schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//User Signup
userSchema.statics.signup = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw Error(
      "password needs to have a minumum length of 8 characters with a mix of uppercase,lowercase, numbers, and symbols."
    );
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

// User Login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid email");
  }

  const validUser = await bcrypt.compare(password, user.password);

  if (!validUser) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("usersModel", userSchema);
