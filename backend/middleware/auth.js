const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware to protect routes - ensures user is authenticated
 */
exports.protect = async (req, res, next) => {
  let token;

  // Check if token is in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
  }
  // Check if token is in cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "temporarysecret"
    );

    // Add user to request object
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Not authorized to access this route",
    });
  }
};

/**
 * Middleware to restrict access to specific roles
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to access this route",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`,
      });
    }

    next();
  };
};

/**
 * Middleware to check if user is verified
 */
exports.isVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      error: "Please verify your email to access this route",
    });
  }

  next();
};
