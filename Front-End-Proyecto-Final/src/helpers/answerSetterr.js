export const setAnswer = (
  Id,
  Id_encuestado = "",
  Type,
  Score = "",
  Options = [""],
  Entrada_texto = ""
) => {
  const Answer = {
    id: Id,
    id_encuestado: Id_encuestado,
    type: Type,
    score: Score,
    options: Options,
    entrada_texto: Entrada_texto,
  };
  return Answer;
};
