import React from "react";
import { useNavigate } from "react-router-dom";
import "./NewPage.css"; // Import the CSS for NewPage

function NewPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/blank-page");
  };

  return (
    <div className="new-page">
      <h2>Coding Quetions</h2>
      <div className="grid-container">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={`grid-row ${index % 2 === 0 ? "row-light" : "row-dark"}`}
          >
            <p>Question {index + 1}</p>
            <button className="green-button" onClick={handleButtonClick}>
              Solve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewPage;
