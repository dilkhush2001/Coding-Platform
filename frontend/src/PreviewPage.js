import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const PreviewPage = () => {
  const location = useLocation();
  const { content, images, sampleInputs, hiddenTestCases, preview } =
    location.state || {};

  return (
    <Box p={2} sx={{ height: "100vh", width: "50vw" }}>
      <Typography variant="h4">Post Preview</Typography>
      <Box
        dangerouslySetInnerHTML={{ __html: preview }}
        sx={{ marginBottom: "20px" }}
      />
    </Box>
  );
};

export default PreviewPage;
