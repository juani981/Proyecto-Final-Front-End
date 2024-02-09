import { React, useState } from "react";
import { TextField } from "@mui/material";
import { PaperWrapper } from "../../components/PaperWrapper";

const SurveyCreatorComponent = () => {
  const [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    //code here to update the title of the survey in state.
    console.log(event.target.value);
    setTitle(event.target.value);
  };

  return (
    <PaperWrapper>
      <TextField
        label="Título"
        fullWidth
        margin="normal"
        variant="outlined"
        // InputProps={{
        //   readOnly: readOnlyFlag,
        // }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleTitleChange}
      />
    </PaperWrapper>
  );
};
export default SurveyCreatorComponent;
