import { TextField } from "@mui/material";

export const NumericTypeComponent = ({
  question,
  handleTextChange,
  readOnlyFlag,
}) => {
  return (
    <>
      <TextField
        label="Respuesta"
        fullWidth
        margin="normal"
        variant="outlined"
        type="number"
        InputProps={{
          readOnly: readOnlyFlag,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handleTextChange(question.id, e.target.value)}
      />
    </>
  );
};
