import React, { useState } from "react";
import { TextTypeComponent } from "./QuestionTypes/TextTypeComponent";
import { MultipleChoiceTypeComponent } from "./QuestionTypes/MultipleChoiceTypeComponent";
import { ListTypeComponent } from "./QuestionTypes/ListTypeComponent";
import { RatingTypeComponent } from "./QuestionTypes/RatingTypeComponent";
import { QuestionTitleComponent } from "./QuestionTitleComponent";
import { QuestionWrapper } from "./QuestionWrapper";
import { mapper } from "../helpers/mapper";
import { preguntaMap } from "../helpers/maps";

export const QuestionIteratorComponent = ({
  questions,
  answers,
  setAnswers,
  renderForQuestion = true,
  renderForAnswer = false,
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
  const getReadOnlyFlag = () => {
    var flag = "";
    if (renderForAnswer === true) {
      flag = false;
    } else if (renderForQuestion === true) {
      flag = true;
    }
    return flag;
  };
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      const question = questions.find((q) => q.id.toString() === questionId);

      if (question && question.tipo_pregunta === "list") {
        updatedAnswers[questionId] = answer || ""; // Tomar el valor seleccionado o cadena vacía si no hay selección
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
  return questions.map((question) => (
    <QuestionWrapper key={question.id}>
      <QuestionTitleComponent
        question={question}
        readOnlyFlag={getReadOnlyFlag}></QuestionTitleComponent>
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
          handleAnswerChange={handleAnswerChange}></RatingTypeComponent>
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
    </QuestionWrapper>
  ));
};
