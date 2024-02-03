import { Paper } from "@mui/material";

import React from "react";

export const QuestionWrapper = ({ children }) => {
  return (
    <>
      <Paper
        elevation={6}
        style={{
          padding: 20,
          marginBottom: 20,
          position: "relative",
          width: 400,
          margin: "auto",
        }}
        square={true}>
        {children}
      </Paper>
      <hr></hr>
    </>
  );
};
