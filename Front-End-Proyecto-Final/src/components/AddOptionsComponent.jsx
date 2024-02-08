import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const AddOptionsComponent = ({
  questions,
  setQuestions,
  esTexto,
  setEsTexto,
}) => {
  //Hooks
  const [newOption, setNewOption] = useState("");

  //Funciones
  const handleAddOption = () => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const lastQuestion = updatedQuestions[updatedQuestions.length - 1];

      if (
        lastQuestion &&
        (lastQuestion.type === "multiple choice" ||
          lastQuestion.type === "unique choice" ||
          lastQuestion.type === "list")
      ) {
        //setEsTexto(false);
        lastQuestion.options.push(newOption);
      }

      return updatedQuestions;
    });
    setNewOption("");
  };
  return (
    !Boolean(esTexto) && (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}>
          {/* <div style={{ marginTop: 16, textAlign: 'center' }}> */}
          <TextField
            label="Nueva Opción"
            variant="outlined"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOption}
            style={{ marginLeft: 8 }}>
            Agregar Opción
          </Button>
        </div>
      </>
    )
  );
};
export default AddOptionsComponent;
