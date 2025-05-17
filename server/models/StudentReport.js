const mongoose = require('mongoose');

const studentReportSchema = new mongoose.Schema({
  studentName: String,
  rollNo: String,
  subject: String,
  teacher: String,
  marks: {
    cie1: Number,
    cie2: Number,
    external: Number
  },
  semester: String
});

module.exports = mongoose.model('StudentReport', studentReportSchema);
