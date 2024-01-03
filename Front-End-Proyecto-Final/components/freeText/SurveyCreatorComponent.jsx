// SurveyForm.jsx
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Fab,
  Menu,
  MenuItem,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  InputLabel,
  MenuItem as SelectMenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const SurveyFormCreator = ({ questions, onAddQuestion }) => {
  const [questionType, setQuestionType] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['Opción 1']);

  const handleAddOption = () => {
    setOptions((prevOptions) => [...prevOptions, `Opción ${prevOptions.length + 1}`]);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      label: questionText,
      type: questionType,
      options: questionType === 'text' ? [] : options,
    };

    onAddQuestion(newQuestion);
    // Limpiar el estado después de agregar la pregunta
    setQuestionType('');
    setQuestionText('');
    setOptions(['Opción 1']);
  };

  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 50, position: 'relative', width: 400, margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Formulario de Encuesta
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Pregunta"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" margin="normal">
            <FormLabel>Seleccione el tipo de pregunta</FormLabel>
            <RadioGroup
              row
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <FormControlLabel value="text" control={<Radio />} label="Texto" />
              <FormControlLabel value="choice" control={<Radio />} label="Selección Múltiple" />
              <FormControlLabel value="radio" control={<Radio />} label="Radio" />
              <FormControlLabel value="select" control={<Radio />} label="Lista Desplegable" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {['choice', 'radio', 'select'].includes(questionType) && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Opciones:
            </Typography>
            {options.map((option, index) => (
              <TextField
                key={index}
                label={`Opción ${index + 1}`}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...options];
                  updatedOptions[index] = e.target.value;
                  setOptions(updatedOptions);
                }}
              />
            ))}
            <Button variant="outlined" color="primary" onClick={handleAddOption}>
              Agregar Opción
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddQuestion}>
            Agregar Pregunta
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SurveyFormCreator;

