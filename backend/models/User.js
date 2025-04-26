const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Don't return password by default
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  phoneNumber: {
    type: String,
    match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please add a valid phone number"],
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  // Only hash password if it has been modified
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create verification token
UserSchema.methods.getVerificationToken = function () {
  // Generate token
  const verificationToken = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET || "temporarysecret",
    { expiresIn: "1d" }
  );

  // Set token and expiration in database
  this.verificationToken = verificationToken;
  this.verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 1 day

  return verificationToken;
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || "temporarysecret",
    { expiresIn: process.env.JWT_EXPIRE || "30d" }
  );
};

// Generate and hash password reset token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET || "temporarysecret",
    { expiresIn: "1h" }
  );

  // Set token and expiration in database
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
