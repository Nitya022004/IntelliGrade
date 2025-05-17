const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');

const loginTeacher = async (req, res) => {
  const { name, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ name });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Login successful",
      teacher: {
        name: teacher.name,
        subjects: teacher.subjects
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { loginTeacher };
