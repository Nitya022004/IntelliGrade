const mongoose = require('mongoose');
require('dotenv').config();
const Teacher = require('./models/Teacher');
const StudentReport = require('./models/StudentReport');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seed = async () => {
  await mongoose.connection.dropDatabase(); // Clear old data

  const teachers = [
    { name: "Neha", password: "neha123", subjects: ["AI", "ML"] },
    { name: "Viji", password: "viji123", subjects: ["OS", "DBMS"] },
    { name: "Shalini", password: "shalini123", subjects: ["CN", "SE"] },
  ];

  await Teacher.insertMany(teachers);

  const studentData = [];

  const generateStudents = (subject, teacher) => {
    const names = ["Asha", "Ravi", "Meena", "Karan", "Pooja"];
    const rollPrefix = subject.slice(0, 2).toUpperCase();
    return names.map((name, i) => ({
      studentName: name,
      rollNo: `23MCA${rollPrefix}${i + 1}`,
      subject,
      teacher,
      marks: {
        cie1: Math.floor(Math.random() * 25),
        cie2: Math.floor(Math.random() * 25),
        external: Math.floor(Math.random() * 75) + 25,
      },
      semester: "Even 2025",
    }));
  };

  teachers.forEach(t => {
    t.subjects.forEach(sub => {
      studentData.push(...generateStudents(sub, t.name));
    });
  });

  await StudentReport.insertMany(studentData);

  console.log("✅ Fresh data seeded: 3 teachers, 6 subjects, 30 students");
  mongoose.disconnect();
};

seed();
