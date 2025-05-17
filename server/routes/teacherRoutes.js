const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");

// POST /api/teacher/login
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ name, password });

    if (!teacher) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ teacher });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
