import { Paper } from "@mui/material";

import React from "react";

export const QuestionWrapper = ({ children }) => {
  return (
    <>
      <Paper
        elevation={6}
        style={{
          padding: 20,
          marginTop: 10,
          marginBottom: 10,
          position: "relative",
          width: 500,
          margin: "auto",
        }}
        square={true}>
        {children}
      </Paper>
      <hr></hr>
    </>
  );
};
