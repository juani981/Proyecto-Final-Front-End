import React from 'react'
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
};
function createArrayOfObjectsWithStep(min, max, step) {
  const result = [];
  min = parseInt(min)
  max = parseInt(max)
  step = parseInt(step)
  for (let i = min; i <= max; i += step) {
    const obj = {
      value: i,
      label: `${i}`,
    };
    result.push(obj);
  }

  return result;
}

export const RatingTypeComponent = ({question , handleAnswerChange}) => {
  const marksArray = createArrayOfObjectsWithStep(question.range[0],question.range[1],question.range[2]);
  return (
    <Slider
      aria-label="Puntuación"
      defaultValue={3}
      getAriaValueText={valuetext}
      valueLabelDisplay="auto"
      step={parseInt(question.range[2])}
      marks={marksArray} 
      min={parseInt(question.range[0])}
      max={parseInt(question.range[1])}
      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
    />
  )
}
