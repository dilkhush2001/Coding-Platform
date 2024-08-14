import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  ButtonGroup,
  Button,
  Paper,
  Tooltip,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatListBulleted,
  FormatListNumbered,
} from "@mui/icons-material";
import styles from "./AddProblem.module.css";
import axios from "axios";

const AddProblems = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const [sampleInputs, setSampleInputs] = useState([
    { input: "", output: "", explanation: "" },
    { input: "", output: "", explanation: "" },
  ]);
  const [hiddenTestCases, setHiddenTestCases] = useState([
    { input: "", output: "" },
  ]);

  const handleFormatting = (command) => {
    document.execCommand(command);
  };

  const handlePreview = () => {
    const editorContent = document.querySelector("[contentEditable]").innerHTML;

    // Sample Inputs Preview
    let sampleInputsContent = "";
    if (
      sampleInputs.some(
        (sample) => sample.input || sample.output || sample.explanation
      )
    ) {
      sampleInputsContent += "<h5>Sample Inputs</h5>";
      sampleInputs.forEach((sample, index) => {
        if (sample.input || sample.output || sample.explanation) {
          sampleInputsContent += `<p><strong>Input ${index + 1}:</strong> ${
            sample.input
          }</p>`;
          sampleInputsContent += `<p><strong>Output ${index + 1}:</strong> ${
            sample.output
          }</p>`;
          sampleInputsContent += `<p><strong>Explanation:</strong> ${sample.explanation}</p>`;
        }
      });
    }

    setPreview(editorContent + sampleInputsContent);
  };

  const handlePost = async () => {
    const data = {
      content,
      preview,
      sampleInputs,
      hiddenTestCases,
    };

    try {
      // Send a POST request to the backend API
      const response = await axios.post(
        "http://localhost:5000/problems/add",
        data
      );

      // Optionally, navigate to a different page or provide feedback to the user
      console.log("Response from server:", response.data);
      alert("Problem added successfully!");
      navigate("/some-other-page"); // Redirect to a different page if needed
    } catch (error) {
      console.error("Error posting problem:", error);
      alert("Failed to add problem. Please try again.");
    }
  };

  const handleSampleInputChange = (index, field, value) => {
    const updatedSampleInputs = [...sampleInputs];
    updatedSampleInputs[index][field] = value;
    setSampleInputs(updatedSampleInputs);
  };

  const handleHiddenTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...hiddenTestCases];
    updatedTestCases[index][field] = value;
    setHiddenTestCases(updatedTestCases);
  };

  const addHiddenTestCase = () => {
    setHiddenTestCases([...hiddenTestCases, { input: "", output: "" }]);
  };

  return (
    <Grid container className={styles.container}>
      {/* Editor Section */}
      <Grid item xs={12} md={8} className={styles.editorSection}>
        <Box className={styles.toolbar}>
          <ButtonGroup
            variant="outlined"
            aria-label="text formatting"
            className={styles.buttonGroup}
          >
            <Tooltip title="Bold">
              <Button onClick={() => handleFormatting("bold")}>
                <FormatBold />
              </Button>
            </Tooltip>
            <Tooltip title="Italic">
              <Button onClick={() => handleFormatting("italic")}>
                <FormatItalic />
              </Button>
            </Tooltip>
            <Tooltip title="Underline">
              <Button onClick={() => handleFormatting("underline")}>
                <FormatUnderlined />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <ButtonGroup
            variant="outlined"
            aria-label="text alignment"
            className={styles.buttonGroup}
          >
            <Tooltip title="Align Left">
              <Button onClick={() => handleFormatting("justifyLeft")}>
                <FormatAlignLeft />
              </Button>
            </Tooltip>
            <Tooltip title="Align Center">
              <Button onClick={() => handleFormatting("justifyCenter")}>
                <FormatAlignCenter />
              </Button>
            </Tooltip>
            <Tooltip title="Align Right">
              <Button onClick={() => handleFormatting("justifyRight")}>
                <FormatAlignRight />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <ButtonGroup
            variant="outlined"
            aria-label="lists"
            className={styles.buttonGroup}
          >
            <Tooltip title="Bullet List">
              <Button onClick={() => handleFormatting("insertUnorderedList")}>
                <FormatListBulleted />
              </Button>
            </Tooltip>
            <Tooltip title="Numbered List">
              <Button onClick={() => handleFormatting("insertOrderedList")}>
                <FormatListNumbered />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Button
            className={`${styles.previewButton} ${styles.greenButton}`}
            variant="contained"
            onClick={handlePreview}
          >
            Preview
          </Button>
          <Button
            className={`${styles.previewButton} ${styles.blueButton}`}
            variant="contained"
            onClick={handlePost}
          >
            Post
          </Button>
        </Box>

        {/* Editable Area */}
        <Paper
          variant="outlined"
          className={styles.editableArea}
          contentEditable
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
        />

        {/* Sample Inputs Section */}
        <Box className={styles.sampleInputsSection}>
          <Typography variant="h6">Sample Inputs</Typography>
          {sampleInputs.map((sample, index) => (
            <Box key={index} className={styles.sampleInput}>
              <TextField
                label={`Input ${index + 1}`}
                variant="outlined"
                fullWidth
                className={styles.textField}
                value={sample.input}
                onChange={(e) =>
                  handleSampleInputChange(index, "input", e.target.value)
                }
              />
              <TextField
                label={`Output ${index + 1}`}
                variant="outlined"
                fullWidth
                className={styles.textField}
                value={sample.output}
                onChange={(e) =>
                  handleSampleInputChange(index, "output", e.target.value)
                }
              />
              <TextField
                label="Explanation"
                variant="outlined"
                fullWidth
                className={styles.textField}
                value={sample.explanation}
                onChange={(e) =>
                  handleSampleInputChange(index, "explanation", e.target.value)
                }
              />
            </Box>
          ))}
        </Box>

        {/* Hidden Test Cases Section */}
        <Box className={styles.hiddenTestCasesSection}>
          <Typography variant="h6">Hidden Test Cases</Typography>
          {hiddenTestCases.map((testCase, index) => (
            <Box key={index} className={styles.hiddenTestCase}>
              <TextField
                label={`Hidden Input ${index + 1}`}
                variant="outlined"
                fullWidth
                className={styles.textField}
                value={testCase.input}
                onChange={(e) =>
                  handleHiddenTestCaseChange(index, "input", e.target.value)
                }
              />
              <TextField
                label={`Hidden Output ${index + 1}`}
                variant="outlined"
                fullWidth
                className={styles.textField}
                value={testCase.output}
                onChange={(e) =>
                  handleHiddenTestCaseChange(index, "output", e.target.value)
                }
              />
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            className={styles.addButton}
            onClick={addHiddenTestCase}
          >
            Add Test Case
          </Button>
        </Box>
      </Grid>

      {/* Preview Section */}
      <Grid item xs={12} md={4} className={styles.previewSection}>
        <Paper className={styles.previewArea}>
          <Typography variant="h6">Preview</Typography>
          <div dangerouslySetInnerHTML={{ __html: preview }} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddProblems;
