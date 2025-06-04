import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import "../styles/StudentMarksPage.css";

const StudentMarksPage = () => {
  const subject = localStorage.getItem('subject');
  const teacher = localStorage.getItem('teacher');
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ cie1: 0, cie2: 0, external: 0, final: 0 });
  const [newStudent, setNewStudent] = useState({
    rollNo: '',
    studentName: '',
    cie1: '',
    cie2: '',
    external: '',
    final: ''
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/${subject}`);
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, [subject]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        setStudents((prev) => prev.filter((s) => s._id !== id));
      } catch (err) {
        alert("Failed to delete student.");
      }
    }
  };

  const startEdit = (student) => {
    setEditingId(student._id);
    setEditData({ ...student.marks });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ cie1: 0, cie2: 0, external: 0, final: 0 });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, {
        marks: editData,
      });
      setStudents((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, marks: editData } : s
        )
      );
      cancelEdit();
    } catch (err) {
      alert("Failed to update student.");
    }
  };

  const handleAddStudent = async () => {
    try {
      const payload = {
        rollNo: newStudent.rollNo,
        studentName: newStudent.studentName,
        subject,
        teacher,
        semester: "Even 2025",
        marks: {
          cie1: parseInt(newStudent.cie1),
          cie2: parseInt(newStudent.cie2),
          external: parseInt(newStudent.external),
          final: parseInt(newStudent.final)
        }
      };
      const res = await axios.post("http://localhost:5000/api/students", payload);
      setStudents([...students, res.data]);
      setNewStudent({ rollNo: "", studentName: "", cie1: "", cie2: "", external: "", final: "" });
    } catch (err) {
      alert("Failed to add student.");
    }
  };

  const calculateFinalScore = (cie1, cie2, external, finalExam) => {
    const cieAvg = (parseFloat(cie1) + parseFloat(cie2)) / 2;
    return cieAvg + parseFloat(external) + (parseFloat(finalExam) / 2);
  };

  const getGrade = (score) => {
    if (score >= 90) return "O";
    if (score >= 80) return "A+";
    if (score >= 70) return "A";
    if (score >= 60) return "B+";
    if (score >= 50) return "B";
    if (score >= 40) return "C+";
    if (score >= 35) return "C";
    if (score >= 30) return "PASS";
    return "FAIL";
  };

  return (
    <div>
      <Navbar />
      <div className="student-page-container">
        <h2 className="student-page-title">{subject} - Student Marks</h2>

        <div className="mb-6 p-4 border rounded shadow w-fit bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Add New Student</h3>
          <input placeholder="Roll No" className="border px-2 mr-2 mb-2"
            value={newStudent.rollNo}
            onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
          />
          <input placeholder="Name" className="border px-2 mr-2 mb-2"
            value={newStudent.studentName}
            onChange={(e) => setNewStudent({ ...newStudent, studentName: e.target.value })}
          />
          <input placeholder="CIE 1" type="number" className="border px-2 mr-2 mb-2"
            value={newStudent.cie1}
            onChange={(e) => setNewStudent({ ...newStudent, cie1: e.target.value })}
          />
          <input placeholder="CIE 2" type="number" className="border px-2 mr-2 mb-2"
            value={newStudent.cie2}
            onChange={(e) => setNewStudent({ ...newStudent, cie2: e.target.value })}
          />
          <input placeholder="External" type="number" className="border px-2 mr-2 mb-2"
            value={newStudent.external}
            onChange={(e) => setNewStudent({ ...newStudent, external: e.target.value })}
          />
          <input placeholder="Final" type="number" className="border px-2 mr-2 mb-2"
            value={newStudent.final}
            onChange={(e) => setNewStudent({ ...newStudent, final: e.target.value })}
          />
          <button onClick={handleAddStudent} className="bg-blue-600 text-white px-4 py-1 rounded">
            ➕ Add
          </button>
        </div>

        <table className="student-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>CIE 1</th>
              <th>CIE 2</th>
              <th>External</th>
              <th>Final (100)</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, idx) => {
              const isEditing = editingId === s._id;
              const finalScore = calculateFinalScore(s.marks.cie1, s.marks.cie2, s.marks.external, s.marks.final || 0);
              const grade = getGrade(finalScore);
              const editedFinalScore = calculateFinalScore(editData.cie1, editData.cie2, editData.external, editData.final || 0);
              const editedGrade = getGrade(editedFinalScore);

              return (
                <tr key={idx}>
                  <td>{s.rollNo}</td>
                  <td>{s.studentName}</td>
                  {isEditing ? (
                    <>
                      <td><input value={editData.cie1} onChange={(e) => setEditData({ ...editData, cie1: e.target.value })} /></td>
                      <td><input value={editData.cie2} onChange={(e) => setEditData({ ...editData, cie2: e.target.value })} /></td>
                      <td><input value={editData.external} onChange={(e) => setEditData({ ...editData, external: e.target.value })} /></td>
                      <td><input value={editData.final} onChange={(e) => setEditData({ ...editData, final: e.target.value })} /></td>
                      <td>{editedGrade}</td>
                      <td>
                        <button onClick={() => saveEdit(s._id)}>✅</button>
                        <button onClick={cancelEdit} style={{ color: "orange" }}>❌</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{s.marks.cie1}</td>
                      <td>{s.marks.cie2}</td>
                      <td>{s.marks.external}</td>
                      <td>{s.marks.final || 0}</td>
                      <td>{grade}</td>
                      <td>
                        <button onClick={() => startEdit(s)}>✏️</button>
                        <button onClick={() => handleDelete(s._id)} style={{ color: "red" }}>❌</button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentMarksPage;
