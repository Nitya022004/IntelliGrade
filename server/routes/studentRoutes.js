const express = require('express');
const router = express.Router();
const StudentReport = require('../models/StudentReport');

// Get all students for a subject
router.get('/:subject', async (req, res) => {
  try {
    const students = await StudentReport.find({ subject: req.params.subject });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  try {
    const newStudent = await StudentReport.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: "Error creating student" });
  }
});

// Edit student marks
router.put('/:id', async (req, res) => {
  try {
    const updated = await StudentReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating student" });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    await StudentReport.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student" });
  }
});

module.exports = router;
