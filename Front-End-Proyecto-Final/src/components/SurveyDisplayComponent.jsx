import {
  Container,
  Paper,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { TextTypeComponent } from './QuestionTypes/TextTypeComponent';
import { MultipleChoiceTypeComponent } from './QuestionTypes/MultipleChoiceTypeComponent';
import { ListTypeComponent } from './QuestionTypes/ListTypeComponent';
// ... (importaciones)

const SurveyDisplayComponent = () => {
  //Preguntas de mock
  // const newQuestion1 = {
  //   id: 1,
  //   pregunta: `Pregunta 1`,
  //   tipo_pregunta: 'list',
  //   seleccion: ['Opción 1', 'Opción 2', 'Opción 3'],
  // };
  // const newQuestion2 = {
  //   id: 2,
  //   pregunta: `Pregunta 2`,
  //   tipo_pregunta: 'text',
  //   seleccion: [''],
  // };
  // //Seccion de parseo, puedo reibir una ista de objetos en formato JSON y usarlos como estado por defecto
  // const arreglo = [newQuestion1,newQuestion2];
  // const arreglostring = JSON.stringify(arreglo);
  // const arregloparsed = JSON.parse(arreglostring);
  // //console.log("Arreglo String:" ,{arreglostring});

  //
    const [questions, setQuestions] = useState([]);
    const [showFirstQuestion, setShowFirstQuestion] = useState(true);
    const [answers, setAnswers] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
  
    //setQuestions(JSON.parse(nqstr1));
    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prevAnswers) => {
          const updatedAnswers = { ...prevAnswers };
          const question = questions.find((q) => q.id.toString() === questionId);
      
          if (question && question.tipo_pregunta === 'list') {
            updatedAnswers[questionId] = answer || ''; // Tomar el valor seleccionado o cadena vacía si no hay selección
          } else {
            updatedAnswers[questionId] = answer;
          }
      
          // Cierra manualmente el menú de selección al elegir una opción
          const selectElement = document.getElementById(`list-${questionId}`);
          if (selectElement) {
            selectElement.blur();
          }
      
          return updatedAnswers;
        });
      };
      
    const handleTypeMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleTypeMenuItemClick = (tipo_pregunta) => {
      setAnchorEl(null);
      const newQuestionId = questions.length + 1;
      let newQuestion;
      if (tipo_pregunta === 'text') {
        newQuestion = {
          id: newQuestionId,
          pregunta: `Pregunta ${newQuestionId}`,
          tipo_pregunta: 'text',
        };
      } else if (tipo_pregunta === 'multiple choice' || tipo_pregunta === 'unique choice') {
        newQuestion = {
          id: newQuestionId,
          pregunta: `Pregunta ${newQuestionId}`,
          tipo_pregunta: tipo_pregunta,
          seleccion: ['Opción 1', 'Opción 2', 'Opción 3'],
        };
      } else if (tipo_pregunta === 'list') {
        newQuestion = {
          id: newQuestionId,
          pregunta: `Pregunta ${newQuestionId}`,
          tipo_pregunta: 'list',
          seleccion: ['Opción 1', 'Opción 2', 'Opción 3'],
        };
      }
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
      //setQuestions((newQuestion1) => [...newQuestion1,newQuestion2]);
      setShowFirstQuestion(true);
    };
  
    const handleSubmit = () => {
      // Modificar el manejo de respuestas para preguntas de tipo 'multiple choice'
      const updatedAnswers = {};
      questions.forEach((question) => {
        const answer = answers[question.id] || ''; // Tomar la respuesta o cadena vacía si no hay respuesta
        updatedAnswers[question.id] = answer;
      });
      Object.keys(answers).forEach((questionId) => {
        const question = questions.find((q) => q.id.toString() === questionId);

        if (question && ['multiple choice', 'list'].includes(question.tipo_pregunta)) {
          updatedAnswers[questionId] = answers[questionId] || []; // Tomar el array de opciones seleccionadas o un array vacío
        } else {
          updatedAnswers[questionId] = answers[questionId];
        }
      });
      console.log('Respuestas enviadas:', updatedAnswers);
    };
    const handleDownload = () => {
    //guardado
    
    // Convierte la lista de objetos a formato JSON
    const jsonString = JSON.stringify(questions, null, 2); // El segundo parámetro (null) y el tercer parámetro (2) son opciones para dar formato al JSON
    // Crea un objeto Blob con el contenido JSON
  const blob = new Blob([jsonString], { tipo_pregunta: 'application/json' });

  // Crea un enlace (a) para descargar el archivo
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'data.json';

  // Simula un clic en el enlace para iniciar la descarga
  link.click();
  setQuestions([]);
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
            console.log("Datos JSON:",jsonData);
            setQuestions(jsonData);
          } catch (error) {
            console.error('Error al parsear el archivo JSON:', error);
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
            Creación de una Encuesta
          </Typography>
          <Paper
          elevation={3}
          style={{
            padding: 20,
            marginTop: 50,
            position: 'relative',
            width: 400,
            margin: 'auto',
          }}
        >
          
            {/* <Grid container spacing={2}> */}
              {questions.map((question) => (
                  <Paper
                  elevation={3}
                  style={{
                    padding: 20,
                    marginTop: 50,
                    position: 'relative',
                    width: 400,
                    margin: 'auto',
                  }}
                >
                    <TextTypeComponent question={question}></TextTypeComponent>
                  {/* <Grid item xs={12} key={question.id}> */}
                  {/*All Agregar preguntas ésto no es necesario*/ }
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
                    {['multiple choice', 'unique choice'].includes(question.type) && (
                      <MultipleChoiceTypeComponent question={question} answers={answers} handleAnswerChange={handleAnswerChange}>
                      </MultipleChoiceTypeComponent>
                    )}
                    {(question.type === 'list' && (question.options.length > 0)) && (
                      <ListTypeComponent question={question} answers={answers} handleAnswerChange={handleAnswerChange}>

                      </ListTypeComponent>
                    )}
                        </Paper>
                      ))}

        </Paper>
        <Paper><p>Cargar una encuesta JSON</p>
            <div>
             <input type="file" onChange={handleFileInputChange}/>
           </div></Paper>
      </Container>
      
      </>
    );
  };
  export default SurveyDisplayComponent;
  