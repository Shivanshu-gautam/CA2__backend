require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Feedback Management API is running"
    });
});

app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5050;

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing. Create a .env file using .env.example.");
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
