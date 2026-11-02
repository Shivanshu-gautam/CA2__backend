const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Feedback = require("../model/Feedback");

// POST /api/feedback - Submit student feedback
router.post("/", async (req, res) => {
    try {
        const { studentName, courseName, message, rating } = req.body;
        if (
            typeof studentName !== "string" || !studentName.trim() ||
            typeof courseName !== "string" || !courseName.trim() ||
            typeof message !== "string" || !message.trim() ||
            rating === undefined || rating === null || rating === ""
        ) {
            return res.status(400).json({
                message: "studentName, courseName, message and rating are required"
            });
        }

        const numericRating = Number(rating);
        if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).json({
                message: "Rating must be an integer between 1 and 5"
            });
        }

        const feedback = new Feedback({
            studentName: studentName.trim(),
            courseName: courseName.trim(),
            message: message.trim(),
            rating: numericRating
        });

        const savedFeedback = await feedback.save();

        return res.status(201).json({
            message: "Feedback submitted successfully",
            feedback: savedFeedback
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});

// GET /api/feedback?page=1&limit=10 - Retrieve feedback with pagination
router.get("/", async (req, res) => {
    try {
        const parsedPage = Number.parseInt(req.query.page, 10);
        const parsedLimit = Number.parseInt(req.query.limit, 10);

        const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
        const requestedLimit = Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;
        const limit = Math.min(requestedLimit, 100);
        const skip = (page - 1) * limit;

        const [feedbacks, totalRecords] = await Promise.all([
            Feedback.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            Feedback.countDocuments()
        ]);

        return res.status(200).json({
            currentPage: page,
            limit,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            feedbacks
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

// PATCH /api/feedback/:id - Update feedback review status
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid feedback ID"
            });
        }

        if (!["Pending", "Reviewed"].includes(status)) {
            return res.status(400).json({
                message: "Status must be either Pending or Reviewed"
            });
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedFeedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        return res.status(200).json({
            message: "Feedback status updated successfully",
            feedback: updatedFeedback
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
