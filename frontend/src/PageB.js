import React, { useState } from "react";
import { Chip, Button } from "@mui/material";
import "./PageB.css";

function PageB() {
  const [selectedChip, setSelectedChip] = useState("");

  const handleChipClick = (chipName) => {
    setSelectedChip(chipName);
  };

  return (
    <div className="page-b">
      <div className="chip-containe">
        <div className="chips">
          <Chip label="Tree" onClick={() => handleChipClick("Tree")} />
          <Chip label="Graphs" onClick={() => handleChipClick("Graphs")} />
          <Chip
            label="Linkedlist"
            onClick={() => handleChipClick("Linkedlist")}
          />
          <Chip label="Array" onClick={() => handleChipClick("Tree")} />
          <Chip label="Map" onClick={() => handleChipClick("Map")} />
          <Chip label="BFS" onClick={() => handleChipClick("BFS")} />
          <Chip label="DFS" onClick={() => handleChipClick("DFS")} />
          <Chip label="DP" onClick={() => handleChipClick("Dp")} />
          <Chip label="Trie" onClick={() => handleChipClick("Trie")} />
          {/* Add more chips as needed */}
        </div>
        <div className="details">
          <h4>Select The Topic From Grid </h4>
          {selectedChip && (
            <>
              <h2>{selectedChip}</h2>
              <Button variant="contained" color="success">
                Start
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageB;
