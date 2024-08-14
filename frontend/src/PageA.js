import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageA.css"; // Import the CSS for PageA

function PageA() {
  const navigate = useNavigate();

  const handleGridClick = (gridNumber) => {
    navigate("/new-page");
  };

  return (
    <div className="page-a">
      <center>
        <h2>Coding Playground</h2>
      </center>

      <div className="grid-containers">
        <div
          className="grid-item grid-item-1"
          onClick={() => handleGridClick(1)}
        >
          1
        </div>
        <div
          className="grid-item grid-item-2"
          onClick={() => handleGridClick(2)}
        >
          2
        </div>
        <div
          className="grid-item grid-item-3"
          onClick={() => handleGridClick(3)}
        >
          3
        </div>
        <div
          className="grid-item grid-item-4"
          onClick={() => handleGridClick(4)}
        >
          4
        </div>
        <div
          className="grid-item grid-item-5"
          onClick={() => handleGridClick(5)}
        >
          5
        </div>
        <div
          className="grid-item grid-item-6"
          onClick={() => handleGridClick(6)}
        >
          6
        </div>
      </div>
    </div>
  );
}

export default PageA;
