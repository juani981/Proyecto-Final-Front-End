// SurveyCreatorComponent.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Fab,
  Menu,
  MenuItem,
  Radio,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  Rating,
  InputLabel,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// ... (importaciones)
import { SaveSurveyComponent } from "../components/SaveSurveyComponent";
import AddQuestionComponent from "../components/AddQuestionComponent";
import { TextTypeComponent } from "../components/QuestionTypes/TextTypeComponent";
import { MultipleChoiceTypeComponent } from "../components/QuestionTypes/MultipleChoiceTypeComponent";
import { QuestionWrapper } from "../components/QuestionWrapper";
import { Mock } from "../components/Mock";
import { ListTypeComponent } from "../components/QuestionTypes/ListTypeComponent";
import { QuestionIteratorComponent } from "../components/QuestionIteratorComponent";

const SurveyCreatorComponent = () => {
  //Preguntas de mock
  // const newQuestion1 = {
  //   id: 1,
  //   label: `Pregunta 1`,
  //   type: 'list',
  //   options: ['Opción 1', 'Opción 2', 'Opción 3'],
  // };
  // const newQuestion2 = {
  //   id: 2,
  //   label: `Pregunta 2`,
  //   type: 'text',
  //   options: [''],
  // };
  // //Seccion de parseo, puedo reibir una ista de objetos en formato JSON y usarlos como estado por defecto
  // const arreglo = [newQuestion1,newQuestion2];
  // const arreglostring = JSON.stringify(arreglo);
  // const arregloparsed = JSON.parse(arreglostring);
  // //console.log("Arreglo String:" ,{arreglostring});
  //
  const [questions, setQuestions] = useState([]);
  //const [showFirstQuestion, setShowFirstQuestion] = useState(false);
  const [answers, setAnswers] = useState({});
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleAnswerChange = (questionId, answer) => {
  //     setAnswers((prevAnswers) => {
  //       const updatedAnswers = { ...prevAnswers };
  //       const question = questions.find((q) => q.id.toString() === questionId);

  //       if (question && question.type === 'list') {
  //         updatedAnswers[questionId] = answer || ''; // Tomar el valor seleccionado o cadena vacía si no hay selección
  //       } else {
  //         updatedAnswers[questionId] = answer;
  //       }

  //       // Cierra manualmente el menú de selección al elegir una opción
  //       const listElement = document.getElementById(`list-${questionId}`);
  //       if (listElement) {
  //         listElement.blur();
  //       }

  //       return updatedAnswers;
  //     });
  //   };

  const handleSubmit = (event) => {
    // Modificar el manejo de respuestas para preguntas de tipo 'multiple choice'
    const updatedAnswers = {};
    questions.forEach((question) => {
      const answer = answers[question.id] || ""; // Tomar la respuesta o cadena vacía si no hay respuesta
      updatedAnswers[question.id] = answer;
    });
    Object.keys(answers).forEach((questionId) => {
      const question = questions.find((q) => q.id.toString() === questionId);

      if (question && ["multiple choice", "list"].includes(question.type)) {
        updatedAnswers[questionId] = answers[questionId] || []; // Tomar el array de opciones seleccionadas o un array vacío
      } else {
        updatedAnswers[questionId] = answers[questionId];
      }
    });
    console.log("Respuestas enviadas:", updatedAnswers);
  };
  const handleDownload = (event) => {
    //guardado

    // Convierte la lista de objetos a formato JSON
    const jsonString = JSON.stringify(questions, null, 2); // El segundo parámetro (null) y el tercer parámetro (2) son opciones para dar formato al JSON
    // Crea un objeto Blob con el contenido JSON
    const blob = new Blob([jsonString], { type: "application/json" });

    // Crea un enlace (a) para descargar el archivo
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    console.log(jsonString);
    // Simula un clic en el enlace para iniciar la descarga
    link.click();
    //setQuestions([]);
    event.preventDefault();
  };

  const [dataReader, setDataReader] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setDataReader(jsonData);
          console.log("Datos JSON:", jsonData);
          setQuestions(jsonData);
        } catch (error) {
          console.error("Error al parsear el archivo JSON:", error);
        }
      };

      reader.readAsText(file);
      //console.log("Datos obtenidos:",reader);
    }
    console.log(dataReader);
  };
  //Funcionailad experimental de agregar opciones dinammicamente
  const handleAddOption = (questionId) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const questionIndex = updatedQuestions.findIndex(
        (q) => q.id === questionId
      );

      if (questionIndex !== -1) {
        const newOptionId = updatedQuestions[questionIndex].options.length + 1;
        const newOption = `Opción ${newOptionId}`;

        updatedQuestions[questionIndex].options.push(newOption);
      }

      return updatedQuestions;
    });
  };
  const handleTitleChange = (questionId, title) => {
    //Encuentro la pregunta con ese ID
    const question = questions.find((item) => item.id === questionId);
    //Asigno el valor que se pasa por formulario a title.
    // Asigno el valor que se pasa por formulario a title.
    if (question) {
      question.title = title;
      return question.title;
    } else {
      // Manejar el caso en el que no se encuentra la pregunta
      console.error(`Pregunta con ID ${questionId} no encontrada.`);
      return null; // o algún valor por defecto
    }
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Creación de una Encuesta
        </Typography>
        {/* <Paper
          elevation={3}
          style={{
            padding: 20,
            marginTop: 50,
            position: 'relative',
            width: 400,
            margin: 'auto',
          }}
        > */}

        {/* <Grid item xs={12} key={question.id}> */}
        {/*All Agregar preguntas ésto no es necesario*/}
        {/* {question.type === 'text' && (
              <TextField
              label={question.label}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              />
            )} */}
        <QuestionIteratorComponent
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          renderForQuestion={true}></QuestionIteratorComponent>
        {/* {questions.map((question) => (
                  <QuestionWrapper key={question.id}>
                    <TextTypeComponent question={question} handleTitleChange={handleTitleChange}></TextTypeComponent>
                    {['multiple choice', 'unique choice'].includes(question.type) && (
                      <MultipleChoiceTypeComponent question={question} answers={answers}></MultipleChoiceTypeComponent>
                    )}
                    {(question.type === 'list' && (question.options.length > 0)) && (
                      <ListTypeComponent question={question} answers={answers}></ListTypeComponent>
                    )}
                        </QuestionWrapper>
                      ))} */}
        <AddQuestionComponent
          questions={questions}
          setQuestions={setQuestions}></AddQuestionComponent>
        {/* </Grid>*/}

        {/* Botón de añadir pregunta */}
        {/* <Fab
            color="primary"
            aria-label="add"
            style={{
              position: 'absolute',
              bottom: 55,
              right: 16,
            }}
            onClick={handleTypeMenuOpen}
          >
            <AddIcon />
          </Fab> */}

        {/* <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleTypeMenuItemClick('text')}>Texto</MenuItem>
            <MenuItem onClick={() => handleTypeMenuItemClick('multiple choice')}>Selección Múltiple</MenuItem>
            <MenuItem onClick={() => handleTypeMenuItemClick('unique choice')}>Selección Única</MenuItem>
            <MenuItem onClick={() => handleTypeMenuItemClick('list')}>Lista</MenuItem>
            <MenuItem onClick={() => handleTypeMenuItemClick('rating')}>Rating</MenuItem>
          </Menu> */}
        {/* boton descarga */}
        {/* </Paper> */}
        <SaveSurveyComponent
          handleDownloadprop={handleDownload}></SaveSurveyComponent>
      </Container>
    </>
  );
};

export default SurveyCreatorComponent;
