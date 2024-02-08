import React from "react";
import { TextTypeComponent } from "./QuestionTypes/TextTypeComponent";
import { MultipleChoiceTypeComponent } from "./QuestionTypes/MultipleChoiceTypeComponent";
import { ListTypeComponent } from "./QuestionTypes/ListTypeComponent";
import { RatingTypeComponent } from "./QuestionTypes/RatingTypeComponent";
import { QuestionTitleComponent } from "./QuestionTitleComponent";
import { QuestionWrapper } from "./QuestionWrapper";
import AddOptionsComponent from "./AddOptionsComponent";

export const QuestionIteratorComponent = ({
  questions,
  answers,
  setQuestions,
  setAnswers,
  renderForQuestion,
  renderForAnswer,
}) => {
  //Comprueba si la prop es para renderizar preguntas o respuestas, para cambiar el label
  const getLabel = (questionId) => {
    var label = "";
    if (renderForAnswer === true) {
      label = "Respuesta";
    } else if (renderForQuestion === true) {
      label = `Pregunta${questionId}`;
    }
    return label;
  };
  const getReadOnlyFlag = (question) => {
    if (renderForAnswer) {
      // Allow editing of answers when rendering answers
      return false;
    } else if (renderForQuestion) {
      // Default to read-only when neither prop is true
      return true;
    }
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
  const handleQuestionChange = (questionId, updatedQuestion) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId ? updatedQuestion : question
      )
    );
  };
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      const question = questions.find((q) => q.id.toString() === questionId);

      // if (question && question.tipo_pregunta === "list") {
      //   updatedAnswers[questionId] = answer || ""; // Tomar el valor seleccionado o cadena vacía si no hay selección
      // } else
      updatedAnswers[questionId] = answer;

      // Cierra manualmente el menú de selección al elegir una opción
      const selectElement = document.getElementById(`list-${questionId}`);
      if (selectElement) {
        selectElement.blur();
      }

      return updatedAnswers;
    });
  };

  return questions.map((question) => (
    <QuestionWrapper key={question.id}>
      <>
        <QuestionTitleComponent
          question={question}
          readOnlyFlag={getReadOnlyFlag}
          handleTitleChange={handleTitleChange}></QuestionTitleComponent>
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
        {question.type === "text" && (
          <TextTypeComponent
            question={question}
            handleTextChange={handleAnswerChange}
            readOnlyFlag={getReadOnlyFlag()}></TextTypeComponent>
        )}
        {question.type === "rating" && (
          <RatingTypeComponent
            question={question}
            handleAnswerChange={handleAnswerChange}
            handleQuestionChange={handleQuestionChange}
            readOnlyFlag={getReadOnlyFlag()}></RatingTypeComponent>
        )}
        {question.type === "list" && question.options.length > 0 && (
          <ListTypeComponent
            question={question}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
            label={getLabel(question.id)}></ListTypeComponent>
        )}
        {["multiple choice", "unique choice"].includes(question.type) && (
          <MultipleChoiceTypeComponent
            question={question}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
            label={getLabel(question.id)}></MultipleChoiceTypeComponent>
        )}
        {["multiple choice", "unique choice", "list"].includes(
          question.type
        ) && (
          <AddOptionsComponent
            setQuestions={setQuestions}></AddOptionsComponent>
        )}
      </>
    </QuestionWrapper>
  ));
};
