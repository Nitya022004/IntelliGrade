const mongoose = require('mongoose');
const StudentReport = require('./models/StudentReport');

mongoose.connect('mongodb://localhost:27017/gradescope', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seed = async () => {
  await StudentReport.deleteMany({ subject: "OS" }); // optional cleanup

  await StudentReport.insertMany([
    {
      studentName: "Anusha",
      rollNo: "23MCA004",
      subject: "OS",
      teacher: "Viji",
      marks: {
        cie1: 24,
        cie2: 23,
        external: 72,
      },
      semester: "Even 2025",
    },
    {
      studentName: "Riya",
      rollNo: "23MCA009",
      subject: "OS",
      teacher: "Viji",
      marks: {
        cie1: 18,
        cie2: 20,
        external: 62,
      },
      semester: "Even 2025",
    },
    {
      studentName: "Meena",
      rollNo: "23MCA012",
      subject: "OS",
      teacher: "Viji",
      marks: {
        cie1: 20,
        cie2: 19,
        external: 78,
      },
      semester: "Even 2025",
    },
  ]);

  console.log("✅ Seeded OS students");
  mongoose.disconnect();
};

seed();
