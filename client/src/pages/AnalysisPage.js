import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF6666", "#00BFFF", "#90EE90", "#FF1493"];

const GRADE_ORDER = ["O", "A+", "A", "B+", "B", "C+", "C", "PASS", "FAIL"];

const AnalysisPage = () => {
  const subject = localStorage.getItem("subject");
  const chartRef = useRef();
  const [students, setStudents] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [passPercent, setPassPercent] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get(`http://localhost:5000/api/students/${subject}`);
      setStudents(res.data);
    };
    fetchStudents();
  }, [subject]);

  useEffect(() => {
    const gradeCount = {};
    let passed = 0;

    students.forEach((s) => {
      const total = s.marks.cie1 + s.marks.cie2 + s.marks.external / 2;
      const grade = getGrade(total);
      gradeCount[grade] = (gradeCount[grade] || 0) + 1;
      if (grade !== "FAIL") passed++;
    });

    const formatted = GRADE_ORDER.map((g) => ({
      name: g,
      value: gradeCount[g] || 0,
    }));

    setGradeData(formatted);
    setPassPercent(Math.round((passed / students.length) * 100));
  }, [students]);

  const getGrade = (final) => {
    if (final >= 90) return "O";
    if (final >= 80) return "A+";
    if (final >= 70) return "A";
    if (final >= 60) return "B+";
    if (final >= 50) return "B";
    if (final >= 40) return "C+";
    if (final >= 35) return "C";
    if (final >= 30) return "PASS";
    return "FAIL";
  };

  const downloadPDF = () => {
    const input = chartRef.current;
    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(img, "PNG", 10, 10, 190, 0);
      pdf.save(`${subject}_performance_report.pdf`);
    });
  };

  const dummyComparison = [
    { year: "2023", pass: 81 },
    { year: "2024", pass: 74 },
    { year: "2025", pass: passPercent },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-6">{subject} - Performance Analysis</h2>

        <div ref={chartRef}>
          <div className="flex flex-wrap gap-10 mb-10">
            {/* PIE CHART */}
            <div>
              <h3 className="font-semibold mb-2">Grade Distribution</h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>

            {/* BAR CHART */}
            <div>
              <h3 className="font-semibold mb-2">Pass Percentage Comparison</h3>
              <BarChart width={350} height={300} data={dummyComparison}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pass" fill="#00BFFF" />
              </BarChart>
            </div>
          </div>
        </div>

        {/* EXPORT BUTTON */}
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          📥 Export as PDF
        </button>
      </div>
    </div>
  );
};

export default AnalysisPage;
