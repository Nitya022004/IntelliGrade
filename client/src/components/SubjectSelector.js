import React from "react";

const SubjectSelector = ({ subjects, selected, setSelected }) => {
  return (
    <select
      className="border px-4 py-2"
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      <option value="">Select Subject</option>
      {subjects.map((subj, idx) => (
        <option key={idx} value={subj}>
          {subj}
        </option>
      ))}
    </select>
  );
};

export default SubjectSelector;
