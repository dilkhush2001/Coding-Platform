import React, { useState, useEffect } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import Styles from "./Editor.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LightModeIcon from "@mui/icons-material/LightMode";
import CachedIcon from "@mui/icons-material/Cached";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";

const CodeEditor = ({ defaultInput }) => {
  const [Language, setLanguage] = useState("java");
  const [ScreenMode, setScreenMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [codeContent, setCodeContent] = useState("");
  const [Custominput, setCustominput] = useState(defaultInput || ""); // Initialize with defaultInput
  const [consoleOutput, setConsoleOutput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [messageType, setMessageType] = useState(""); // New state for message type

  const Code = {
    python: `print("Hello World!")`,
    java: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  };

  useEffect(() => {
    setCodeContent(Code[Language]);
  }, [Language]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  useEffect(() => {
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (expectedOutput.trim() && consoleOutput.trim()) {
      if (expectedOutput.trim() === consoleOutput.trim()) {
        setMessageType("success");
      } else {
        setMessageType("failure");
      }
    } else {
      setMessageType("");
    }
  }, [expectedOutput, consoleOutput]);

  useEffect(() => {
    setCustominput(defaultInput); // Update input field with defaultInput when it changes
  }, [defaultInput]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleRunCode = async () => {
    const data = {
      Language: Language,
      codeContent: codeContent,
      input: Custominput,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/execute/compile",
        data
      );
      setConsoleOutput(res.data.output);
    } catch {
      alert("Something went wrong");
    }
  };

  const handleResetCode = () => {
    setTimer(0);
    setIsRunning(true);
    setCodeContent(Code[Language]);
    setCustominput(defaultInput || ""); // Reset input field to defaultInput
    setConsoleOutput("");
    setExpectedOutput("");
    setMessageType(""); // Reset the message type
  };

  const toggleFullscreen = () => {
    const editorElement = document.querySelector(`.${Styles.main}`);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      editorElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      handleRunCode();
    });
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.left}>
        <div className={Styles.head}>
          <Select
            value={Language}
            onChange={(event) => setLanguage(event.target.value)}
            className={Styles.select}
          >
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="java">Java</MenuItem>
          </Select>
          <div className={Styles.headright}>
            <span className={Styles.time}>{formatTime(timer)}</span>
            <PlayArrowIcon
              style={{ color: "green", fontSize: "40px", cursor: "pointer" }}
              onClick={handleRunCode}
            />
            {ScreenMode ? (
              <DarkModeIcon onClick={() => setScreenMode(!ScreenMode)} />
            ) : (
              <LightModeIcon onClick={() => setScreenMode(!ScreenMode)} />
            )}
            <CachedIcon onClick={handleResetCode} />
            {isFullscreen ? (
              <FullscreenExitIcon onClick={toggleFullscreen} />
            ) : (
              <FullscreenIcon onClick={toggleFullscreen} />
            )}
          </div>
        </div>
        <MonacoEditor
          height="90vh"
          theme={ScreenMode ? "vs-dark" : "light"}
          language={Language}
          value={codeContent}
          onChange={(value) => setCodeContent(value)}
          options={{ fontSize: 16 }}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className={Styles.right}>
        <div className={Styles.input}>
          <div className={Styles.inputhead}>
            <h2>Input:</h2>
          </div>
          <textarea
            value={Custominput}
            onChange={(e) => setCustominput(e.target.value)}
            className={Styles.inputinput}
            placeholder="Enter custom input..."
          />
        </div>
        <div className={Styles.expected}>
          <div className={Styles.expectedhead}>
            <h2>Expected Output:</h2>
          </div>
          <textarea
            value={expectedOutput}
            onChange={(e) => setExpectedOutput(e.target.value)}
            className={Styles.expectedinput}
            placeholder="Expected output..."
          />
        </div>
        <div className={Styles.console}>
          <div className={Styles.consolehead}>
            <h2>Console Output:</h2>
          </div>
          <div className={Styles.consoleresult}>{consoleOutput}</div>
        </div>
        {messageType === "success" && (
          <div className={Styles.match}>Output Matched</div>
        )}
        {messageType === "failure" && (
          <div className={Styles.noMatch}>Output Mismatched</div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
