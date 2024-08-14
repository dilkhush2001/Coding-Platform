import React from "react";
import { Link } from "react-router-dom";
import "./App.css"; // Import your CSS files

function Navbar() {
  return (
    <nav className="App-nav">
      <ul>
        <li>
          <Link to="/a" className="link-a">
            Playground
          </Link>
        </li>
        <li>
          <Link to="/b" className="link-b">
            Arena
          </Link>
        </li>
        <li>
          <Link to="/c" className="link-c">
            Battlegrounds
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
