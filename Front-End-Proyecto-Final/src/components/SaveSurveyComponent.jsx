import React from "react";
import { Button } from "@mui/material";
// ... (importaciones)

export const SaveSurveyComponent = ({ handleSubmit }) => {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{
          marginTop: 40,
        }}>
        Guardar Encuesta
      </Button>
    </>
  );
};
