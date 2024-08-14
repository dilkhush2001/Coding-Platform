import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageC.css";
import l1 from "./images/l1.jpg"; // Import the image for d4
import l2 from "./images/l2.jpg"; // Import the image for d1
import l3 from "./images/l3.jpg"; // Import the image for d2
import l4 from "./images/l4.jpg"; // Import the image for d3

function PageC() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleButtonClick = () => {
    navigate("/contest-page"); // Replace with your route
  };

  return (
    <div className="page-c">
      <h2>Coding Battleground</h2>

      <div className="cards-container">
        <div className="card d1">
          <h3>Your Past Contests</h3>
          <img src={l2} alt="Contest" className="card-image" />
          <button className="card-button" onClick={handleButtonClick}>
            Go to contest
          </button>
        </div>
        <div className="card d2">
          <h3>Upcoming Challenges</h3>
          <img src={l3} alt="Challenges" className="card-image" />
          <button className="card-button" onClick={handleButtonClick}>
            View Challenges
          </button>
        </div>
        <div className="card d3">
          <h3>Leaderboard</h3>
          <img src={l4} alt="Leaderboard" className="card-image" />
          <button className="card-button" onClick={handleButtonClick}>
            See Leaderboard
          </button>
        </div>
        <div className="card d4">
          <div className="user-info">
            <h3>User: x</h3>
            <img src={l1} alt="User" className="user-image" />
            <h3>Rank: 27</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageC;
