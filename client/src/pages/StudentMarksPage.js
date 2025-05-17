import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import "../styles/StudentMarksPage.css";

const StudentMarksPage = () => {
  const subject = localStorage.getItem('subject');
  const teacher = localStorage.getItem('teacher');
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ cie1: 0, cie2: 0, external: 0 });
  const [newStudent, setNewStudent] = useState({
    rollNo: '',
    studentName: '',
    cie1: '',
    cie2: '',
    external: ''
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
    setEditData({ cie1: 0, cie2: 0, external: 0 });
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/students/${id}`, {
        marks: editData,
      });
      setStudents((prev) =>
        prev.map((s) => (s._id === id ? { ...s, marks: editData } : s))
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
        subject: subject,
        teacher: teacher,
        semester: "Even 2025",
        marks: {
          cie1: parseInt(newStudent.cie1),
          cie2: parseInt(newStudent.cie2),
          external: parseInt(newStudent.external)
        }
      };

      const res = await axios.post("http://localhost:5000/api/students", payload);
      setStudents([...students, res.data]);
      setNewStudent({ rollNo: "", studentName: "", cie1: "", cie2: "", external: "" });
    } catch (err) {
      alert("Failed to add student.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-4">{subject} - Student Marks</h2>

        {/* ➕ Add Student Form */}
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
          <button onClick={handleAddStudent} className="bg-blue-600 text-white px-4 py-1 rounded">
            ➕ Add
          </button>
        </div>

        {/* 📋 Student Table */}
        <table className="student-table w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-center">
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
              const final = s.marks.cie1 + s.marks.cie2 + s.marks.external / 2;
              const grade = getGrade(final);
              const editedFinal =
                parseInt(editData.cie1) +
                parseInt(editData.cie2) +
                parseInt(editData.external) / 2;
              const editedGrade = getGrade(editedFinal);

              return (
                <tr key={idx} className="text-center border-b">
                  <td>{s.rollNo}</td>
                  <td>{s.studentName}</td>

                  {isEditing ? (
                    <>
                      <td>
                        <input
                          value={editData.cie1}
                          onChange={(e) =>
                            setEditData({ ...editData, cie1: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={editData.cie2}
                          onChange={(e) =>
                            setEditData({ ...editData, cie2: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={editData.external}
                          onChange={(e) =>
                            setEditData({ ...editData, external: e.target.value })
                          }
                        />
                      </td>
                      <td>{editedFinal}</td>
                      <td>{editedGrade}</td>
                      <td>
                        <button onClick={() => saveEdit(s._id)}>✅</button>
                        <button onClick={cancelEdit} style={{ color: "orange" }}>
                          ❌
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{s.marks.cie1}</td>
                      <td>{s.marks.cie2}</td>
                      <td>{s.marks.external}</td>
                      <td>{final}</td>
                      <td>{grade}</td>
                      <td>
                        <button onClick={() => startEdit(s)}>✏️</button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          style={{ color: "red" }}
                        >
                          ❌
                        </button>
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

function getGrade(final) {
  if (final >= 90) return "O";
  if (final >= 80) return "A+";
  if (final >= 70) return "A";
  if (final >= 60) return "B+";
  if (final >= 50) return "B";
  if (final >= 40) return "C+";
  if (final >= 35) return "C";
  if (final >= 30) return "PASS";
  return "FAIL";
}

export default StudentMarksPage;
