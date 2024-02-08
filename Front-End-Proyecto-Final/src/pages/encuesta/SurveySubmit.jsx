import { Container, Paper, Typography, Button, darken } from "@mui/material";
import React, { useState } from "react";
import { mapper } from "../../helpers/mapper";
import { preguntaMap, respuestaMap } from "../../helpers/maps";
import { QuestionIteratorComponent } from "../../components/QuestionIteratorComponent";

import axios, { postToDataBase } from "../../api/api";

// ... (fin importaciones)

const SurveyDisplayComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleAnswersSubmit = () => {
    const mappedQuestions = mapper.map(questions, preguntaMap);
    console.log("Mapeadas: ", mappedQuestions);
    const updatedAnswers = mappedQuestions.map((question, index) => {
      const formattedAnswer = {
        id: question.id,
        id_encuestado: "",
        type: question.type,
        score: "",
        options: [],
        text_entry: "",
      };

      if (
        ["multiple choice", "list", "unique choice"].includes(question.type)
      ) {
        formattedAnswer.options = answers[index] || [];
      } else if (question.type === "text") {
        formattedAnswer.text_entry = answers[index] || "";
      } else if (question.type === "rating") {
        formattedAnswer.score = answers[index] || "";
      }

      return {
        ...formattedAnswer,
        id: question.id,
      };
    });

    const mappedAnswers = mapper.reverseMap(updatedAnswers, respuestaMap);
    console.log("Respuestas enviadas:", mappedAnswers);
    console.log("answers hook:", answers);
    return mappedAnswers;
  };
  const saveToDatabase = () => {
    const sentAnswers = handleAnswersSubmit();
    postToDataBase("api/respuesta", sentAnswers);
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
          console.log("before:", jsonData);

          const mappedAnswers = mapper.map(jsonData, preguntaMap);
          setQuestions(mappedAnswers);
          console.log("parseo: ", mappedAnswers);
        } catch (error) {
          console.error("Error al parsear el archivo JSON:", error);
        }
      };

      reader.readAsText(file);
      //console.log("Datos obtenidos:",reader);
    }
    //console.log(dataReader);
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Responder una Encuesta
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
        >*/}

        <QuestionIteratorComponent
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
          setQuestions={setQuestions}
          renderForAnswer={true}></QuestionIteratorComponent>

        {/* </Paper> */}
        <Paper>
          <Button onClick={handleAnswersSubmit}>Enviar Respuestas</Button>
        </Paper>
        <Paper>
          <p>Cargar una encuesta JSON</p>
          <div>
            <input type="file" onChange={handleFileInputChange} />
          </div>
        </Paper>
      </Container>
    </>
  );
};
export default SurveyDisplayComponent;
