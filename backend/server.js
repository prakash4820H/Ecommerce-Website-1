const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(cookieParser()); // Parse cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // Allow cookies
  })
);

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to JPBABA E-commerce API" });
});

// Load routes
app.use("/api/auth", require("./routes/auth.routes"));
// app.use('/api/users', require('./routes/user.routes'));
// app.use('/api/products', require('./routes/product.routes'));
// app.use('/api/orders', require('./routes/order.routes'));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../public")));

  // Serve index.html for all routes not handled by API
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || "Server Error",
  });
});

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    // Connection string (in production, this would come from .env)
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/jpbaba_ecommerce";

    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected...");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

startServer();
