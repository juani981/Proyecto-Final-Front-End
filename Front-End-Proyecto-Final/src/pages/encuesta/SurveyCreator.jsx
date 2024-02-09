import { React, useState } from "react";

export const SurveyCreatorComponent = () => {
  const [title, setTitle] = useState("");
  const handleTitleChange = (title) => {
    //code here to update the title of the survey in state.
    console.log(title);
    setTitle(title);
  };

  return (
    <>
      <TextField
        label="Respuesta"
        fullWidth
        margin="normal"
        variant="outlined"
        // InputProps={{
        //   readOnly: readOnlyFlag,
        // }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => handleTitleChange(e.target.value)}
      />
    </>
  );
};
