const express = require('express');
const router = express.Router();
const { loginTeacher } = require('../controllers/teacherController');

// POST /api/teacher/login
router.post('/login', loginTeacher);

module.exports = router;
