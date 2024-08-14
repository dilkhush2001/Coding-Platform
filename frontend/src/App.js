import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddProblems from "./AddProblems/AddProblems";
import "./App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import PageA from "./PageA";
import PageB from "./PageB";
import PageC from "./PageC";
import NewPage from "./NewPage";
import ProblemPage from "./ProblemPage";
import { Button } from "@mui/material";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <Link to="/" className="home-link">
              <h2>Code Hunters</h2>
            </Link>
            <div className="header-buttons">
              <Link to="/add-problem">
                <Button variant="contained" color="primary">
                  Add Problem
                </Button>
              </Link>
            </div>
          </div>
          <Navbar />
        </header>
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a" element={<PageA />} />
            <Route path="/b" element={<PageB />} />
            <Route path="/c" element={<PageC />} />
            <Route path="/new-page" element={<NewPage />} />
            <Route path="/blank-page" element={<ProblemPage />} />
            <Route path="/add-problem" element={<AddProblems />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
