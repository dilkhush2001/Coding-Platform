import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import Editor from "./Editor/Editor";
import Styles from "./ProblemPage.module.css";

function ProblemPage() {
  const [problem, setProblem] = useState(null);
  const [selectedSample, setSelectedSample] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get("http://localhost:5000/GetProblem/problem");
        setProblem(res.data);
        // Set the default sample input when problem is fetched
        if (res.data.sampleInputs.length > 0) {
          setSelectedSample(res.data.sampleInputs[0].input);
        }
      } catch (error) {
        console.error("Error fetching the problem:", error);
      }
    };
    fetchProblem();
  }, []);

  return (
    <div className={Styles.problemPage}>
      <div className={Styles.left}>
        <h2>Problem</h2>
        {problem ? (
          <div>
            <div
              className={Styles.problemContent}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(problem.content),
              }}
            />
            <h3>Sample Inputs:</h3>
            {problem.sampleInputs.map((sample, index) => (
              <div key={index} className={Styles.sample}>
                <p>
                  <strong>Input:</strong> {sample.input}
                </p>
                <p>
                  <strong>Output:</strong> {sample.output}
                </p>
                <p>
                  <strong>Explanation:</strong> {sample.explanation}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading problem...</p>
        )}
      </div>
      <div className={Styles.right}>
        <Editor defaultInput={selectedSample} />
      </div>
    </div>
  );
}

export default ProblemPage;
