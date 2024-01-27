import { getData } from "./apiFetch";

export const questionParse = (rawData) => {
    //Se mapea entre la BD y los datos que usa la app
    //Refactorizarr con mapper.
    let question= {};
    question.id = rawData.id_pregunta;
    question.title = rawData.titulo_pregunta;
    question.type = rawData.tipo_pregunta;
    question.rating = rawData.puntuacion;
    question.options = rawData.seleccion;

return question;
}