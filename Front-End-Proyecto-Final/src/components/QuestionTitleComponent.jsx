import { TextField } from "@mui/material";

export const QuestionTitleComponent = ({
  question,
  readOnlyFlag,
  handleTitleChange,
}) => {
  return (
    <>
      <TextField
        label={`Pregunta ${question.id}`}
        defaultValue={question.title}
        fullWidth
        margin="normal"
        variant="standard"
        //helperText="Respuesta"
        InputProps={{
          readOnly: !readOnlyFlag(),
        }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handleTitleChange(question.id, e.target.value)}
      />
    </>
  );
};
