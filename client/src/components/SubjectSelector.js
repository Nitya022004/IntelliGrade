import React from "react";

function SubjectSelector({ subjects, selected, setSelected }) {
  return (
    <div>
      <label>Select Subject:</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">-- Choose --</option>
        {subjects.map((subj, index) => (
          <option key={index} value={subj}>
            {subj}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SubjectSelector;
