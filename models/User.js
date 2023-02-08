const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// static login method
userSchema.statics.loginUser = async function ({ email, password }) {
  // Validation
  if (!email || !password) {
    throw Error('All fields are required.');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw Error('Incorrect password');
  }

  return user;
};

// static signup method
userSchema.statics.signupUser = async function ({ email, password, username }) {
  // Validation
  if (!email || !password) {
    throw Error('All fields are required.');
  }

  if (!username) {
    throw Error('Something went wrong. Please try again later.');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid.');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough.');
  }

  const emailExists = await this.exists({ email });

  if (emailExists) {
    throw Error('Email already exists.');
  }

  // hash password
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });

  return user;
};

module.exports = mongoose.model('User', userSchema);
