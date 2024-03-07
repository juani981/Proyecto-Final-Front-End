import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteQuestionComponent = () => {
  return (
    <IconButton aria-label="delete" color="error">
      <DeleteIcon />
    </IconButton>
  );
};
