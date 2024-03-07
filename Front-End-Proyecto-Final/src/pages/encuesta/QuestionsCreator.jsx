import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Button } from "@mui/material";
import { SaveSurveyComponent } from "../../components/SaveSurveyComponent";
import AddQuestionComponent from "../../components/AddQuestionComponent";
import { QuestionIteratorComponent } from "../../components/QuestionIteratorComponent";
import { mapper } from "../../helpers/mapper";
import { preguntaMap, respuestaMap } from "../../helpers/maps";
import axios from "../../api/api";

// ... (importaciones)

const QuestionsCreatorComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");
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
  const mapQuestions = () => {
    const questionsData = questions.map((question) => {
      const questionData = {
        id: question.id,
        title: question.title,
        type: question.type,
        options: question.options || [],
        range: question.range || [],
      };

      if (
        ["multiple choice", "list", "unique choice"].includes(question.type)
      ) {
        questionData.options = question.options;
      } else if (question.type === "range") {
        questionData.range = question.range;
      }
      return questionData;
    });

    const mappedQuestions = mapper.reverseMap(questionsData, preguntaMap);
    console.log(questions);
    console.log("Preguntas enviadas:", mappedQuestions);

    return mappedQuestions;
  };
  //Enviar el resultado de mapQuestion  a la DB usando axios
  const postQuestionsToDB = async (event) => {
    event.preventDefault();
    const QuestionsToSubmit = mapQuestions();
    try {
      await csrf();
      await axios.post("/api/encuestas/14/preguntas", QuestionsToSubmit); //14 <- $encuestaId
      // console.log("Succes: ", QuestionsToSubmit);
      navigate("./Home"); //revisar-> No routes matched location "/pages/encuesta/QuestionsCreator/Home"
    } catch (e) {
      console.log(e);
    }
  };
  //Función temporal para guardar en un archivo de texto en vez de enviar a DB
  const handleDownload = (event) => {
    //guardado

    // Convierte la lista de objetos a formato JSON
    const jsonString = JSON.stringify(mapQuestions(), null, 2); // El segundo parámetro (null) y el tercer parámetro (2) son opciones para dar formato al JSON
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
          setQuestions={setQuestions}
          setAnswers={setAnswers}
          renderForAnswer={false}
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
        <Grid
          style={{ width: "50vw", margin: "auto" }}
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
            <AddQuestionComponent
              questions={questions}
              setQuestions={setQuestions}></AddQuestionComponent>
          </Grid>

          <Grid container alignContent="center">
            <Grid item xs={12} sm={12} md={4}>
              <Button variant="contained" color="error">
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" color="primary">
                Guardar Borrador
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <SaveSurveyComponent
                handleSubmit={postQuestionsToDB}></SaveSurveyComponent>
            </Grid>
          </Grid>
        </Grid>
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
      </Container>
    </>
  );
};

export default QuestionsCreatorComponent;
