import React, { useState } from "react";
import { Fab, Menu, MenuItem, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddOptionsComponent from "./AddOptionsComponent";

const AddQuestionComponent = ({ questions, setQuestions }) => {
  //hooks
  const [anchorEl, setAnchorEl] = useState(null);
  //const [showFirstQuestion, setShowFirstQuestion] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [esTexto, setesTexto] = useState(true);

  const handleMenuOpen = (event) => {
    //const [anchorEl, setAnchorEl] = useState(null);
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleTypeMenuItemClick = (type) => {
    setAnchorEl(null);
    const newQuestionId = questions.length + 1;
    let newQuestion;
    if (type === "text") {
      newQuestion = {
        id: newQuestionId,
        title: "",
        //label: `Pregunta ${newQuestionId}`,
        type: "text",
      };
      setesTexto(true);
    } else if (
      type === "multiple choice" ||
      type === "unique choice" ||
      type === "list"
    ) {
      newQuestion = {
        id: newQuestionId,
        title: "",
        //label: `Pregunta ${newQuestionId}`,
        type: type,
        options: [],
      };
      setesTexto(false);
    } else if (type === "rating") {
      newQuestion = {
        id: newQuestionId,
        title: "",
        //label: `Pregunta ${newQuestionId}`,
        type: "rating",
        range: [],
      };
      setesTexto(false);
    }
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    //setQuestions((newQuestion1) => [...newQuestion1,newQuestion2]);
    //setShowFirstQuestion(true);
  };
  /*const handleAddOption = () => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const lastQuestion = updatedQuestions[updatedQuestions.length - 1];

      if (lastQuestion && (lastQuestion.type === 'multiple choice' || lastQuestion.type === 'unique choice' || lastQuestion.type === 'list')) {
        setEsTexto(false);
        lastQuestion.options.push(newOption);
      }

      return updatedQuestions;
    });
    
    setNewOption('');
  };
  */
  return (
    <>
      {/* <AddOptionsComponent
        setQuestions={setQuestions}
        esTexto={esTexto}></AddOptionsComponent> */}
      {/* Botón de añadir pregunta */}
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "absolute",
          bottom: 55,
          right: 16,
        }}
        onClick={(event) => handleMenuOpen(event)}>
        <AddIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose()}>
        {/* Opciones del menú */}
        <MenuItem onClick={() => handleTypeMenuItemClick("text")}>
          Texto
        </MenuItem>
        <MenuItem onClick={() => handleTypeMenuItemClick("multiple choice")}>
          Selección Múltiple
        </MenuItem>
        <MenuItem onClick={() => handleTypeMenuItemClick("unique choice")}>
          Selección Única
        </MenuItem>
        <MenuItem onClick={() => handleTypeMenuItemClick("list")}>
          Lista
        </MenuItem>
        <MenuItem onClick={() => handleTypeMenuItemClick("rating")}>
          Rating
        </MenuItem>
      </Menu>
    </>
  );
};

export default AddQuestionComponent;
