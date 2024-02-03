import { Container, Paper, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { TextTypeComponent } from "../components/QuestionTypes/TextTypeComponent";
import { mapper } from "../helpers/mapper";
import { preguntaMap } from "../helpers/maps";
import { QuestionIteratorComponent } from "../components/QuestionIteratorComponent";
import { setAnswer } from "../helpers/answerSetterr";
// ... (fin importaciones)

const SurveyDisplayComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const handleSubmit = () => {
    const updatedAnswers = {};

    questions.forEach((question) => {
      const answerIndex = question.id; // Adjust for 1-based indices in answers
      const formattedAnswer = {
        id: question.id,
        id_encuestado: "", // You can set the appropriate value for id_encuestado
        type: question.type,
        score: "",
        options: [],
        entrada_texto: "",
      };
      if (["multiple choice", "list"].includes(question.type)) {
        formattedAnswer.options = answers[answerIndex] || []; // Take the array of selected options or an empty array
      } else if (question.type === "text") {
        formattedAnswer.entrada_texto = answers[answerIndex] || ""; // Take the answer or an empty string if there is no answer
      } else if (question.type === "rating") {
        formattedAnswer.score = answers[answerIndex];
      }

      updatedAnswers[question.id] = { ...formattedAnswer };
    });
    console.log("Respuestas enviadas:", updatedAnswers);
    console.log("answers:", answers);
    // You can return updatedAnswers if needed
    return updatedAnswers;
  };

  //   const handleDownload = () => {
  //   //guardado

  //   // Convierte la lista de objetos a formato JSON
  //   const jsonString = JSON.stringify(questions, null, 2); // El segundo parámetro (null) y el tercer parámetro (2) son opciones para dar formato al JSON
  //   // Crea un objeto Blob con el contenido JSON
  // const blob = new Blob([jsonString], { tipo_pregunta: 'application/json' });

  // // Crea un enlace (a) para descargar el archivo
  // const link = document.createElement('a');
  // link.href = URL.createObjectURL(blob);
  // link.download = 'data.json';

  // // Simula un clic en el enlace para iniciar la descarga
  // link.click();
  // setQuestions([]);
  //   };

  const [dataReader, setDataReader] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setDataReader(jsonData);
          console.log(jsonData);
          setQuestions(jsonData);
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
          renderForAnswer={true}></QuestionIteratorComponent>

        {/* </Paper> */}
        <Paper>
          <Button onClick={handleSubmit}>Enviar Respuestas</Button>
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
