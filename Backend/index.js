import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins; update this in production for security
app.use(express.json());

// Base route to check server health
app.get("/", (req, res) => {
    res.send("Backend is running and ready to handle requests!");
});

// MongoDB connection
mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("MongoDB connection error:", error));

// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


