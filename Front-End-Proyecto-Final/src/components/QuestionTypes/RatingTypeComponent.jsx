import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { TextField, Grid } from "@mui/material";
function valuetext(value) {
  return `${value}`;
}
function createArrayOfObjectsWithStep(min, max, step) {
  const result = [];
  min = parseInt(min);
  max = parseInt(max);
  step = parseInt(step);
  for (let i = min; i <= max; i += step) {
    const obj = {
      value: i,
      label: `${i}`,
    };
    result.push(obj);
  }

  return result;
}

export const RatingTypeComponent = ({
  question,
  handleAnswerChange,
  handleQuestionChange,
  readOnlyFlag,
}) => {
  const marksArray = createArrayOfObjectsWithStep(
    question.range[0],
    question.range[1],
    question.range[2]
  );
  const [minValue, setMinValue] = useState(question.range[0]);
  const [maxValue, setMaxValue] = useState(question.range[1]);
  const [stepValue, setStepValue] = useState(question.range[2]);

  const handleMinChange = (e) => {
    setMinValue(e.target.value);
    const updatedRange = [...question.range];
    updatedRange[0] = e.target.value;
    const updatedQuestion = { ...question, range: updatedRange };
    handleQuestionChange(question.id, updatedQuestion);
  };

  const handleMaxChange = (e) => {
    setMaxValue(e.target.value);
    const updatedRange = [...question.range];
    updatedRange[1] = e.target.value;
    const updatedQuestion = { ...question, range: updatedRange };
    handleQuestionChange(question.id, updatedQuestion);
  };

  const handleStepChange = (e) => {
    setStepValue(e.target.value);
    const updatedRange = [...question.range];
    updatedRange[2] = e.target.value;
    const updatedQuestion = { ...question, range: updatedRange };
    handleQuestionChange(question.id, updatedQuestion);
  };
  return !readOnlyFlag ? (
    <Slider
      aria-label="Puntuación"
      defaultValue={Math.ceil(parseInt(question.range[1]) / 2)}
      getAriaValueText={valuetext}
      valueLabelDisplay="auto"
      step={parseInt(question.range[2])}
      marks={marksArray}
      min={parseInt(question.range[0])}
      max={parseInt(question.range[1])}
      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
    />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Mínimo"
          fullWidth
          margin="normal"
          variant="outlined"
          value={minValue}
          //defaultValue={1}
          onChange={handleMinChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Máximo"
          fullWidth
          margin="normal"
          variant="outlined"
          value={maxValue}
          //defaultValue={5}
          onChange={handleMaxChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Paso"
          fullWidth
          margin="normal"
          variant="outlined"
          value={stepValue}
          //defaultValue={1}
          onChange={handleStepChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </Grid>
  );
};
