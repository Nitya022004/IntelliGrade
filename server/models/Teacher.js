const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  password: String,
  subjects: [String]
});

module.exports = mongoose.model('Teacher', teacherSchema);
