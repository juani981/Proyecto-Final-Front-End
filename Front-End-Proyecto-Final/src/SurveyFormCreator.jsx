// SurveyFormCreator.jsx
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Fab,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SurveyFormCreator = () => {
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]); // Opciones de respuesta para preguntas tipo 'choice', 'radio', 'select'
  const [anchorEl, setAnchorEl] = useState(null);


  const handleAddAnswerOption = () => {
    setAnswerOptions((prevAnswerOptions) => [...prevAnswerOptions, `Respuesta ${prevAnswerOptions.length + 1}`]);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      label: questionText,
      type: questionType,
      answer: questionType === 'text' ? [] : answerOptions, // Respuesta como arreglo solo para preguntas que no son de tipo 'text'
    };

    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    // Limpiar el estado después de agregar la pregunta
    setQuestionType('');
    setQuestionText('');
    setAnswerOptions([]);
  };

  const handleTypeMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTypeMenuItemClick = (type) => {
    setAnchorEl(null);
    setQuestionType(type);
  };

  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 50, position: 'relative', width: 400, margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Formulario de Encuesta
      </Typography>

      {questions.map((question, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom>
            Pregunta {index + 1}: {question.label}
          </Typography>
          {question.answer.map((answer, answerIndex) => (
            <Typography key={answerIndex} variant="body1">
              Respuesta {answerIndex + 1}: {answer}
            </Typography>
          ))}
        </div>
      ))}

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
        {['choice', 'radio', 'select'].includes(questionType) && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Respuestas:
            </Typography>
            {answerOptions.map((answerOption, index) => (
              <TextField
                key={index}
                label={`Respuesta ${index + 1}`}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={answerOption}
                onChange={(e) => {
                  const updatedAnswerOptions = [...answerOptions];
                  updatedAnswerOptions[index] = e.target.value;
                  setAnswerOptions(updatedAnswerOptions);
                }}
              />
            ))}
            <Button variant="outlined" color="primary" onClick={handleAddAnswerOption}>
              Agregar Respuesta
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleAddQuestion}
            style={{
              marginTop: 10
            }}>
            Añadir Pregunta
          </Button>
        </Grid>
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: 'absolute',
          bottom: 50,
          right: 16,
        }}
        onClick={handleTypeMenuOpen}
      >
        <AddIcon />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleTypeMenuItemClick('text')}>Texto</MenuItem>
        <MenuItem onClick={() => handleTypeMenuItemClick('choice')}>Selección Múltiple</MenuItem>
        <MenuItem onClick={() => handleTypeMenuItemClick('radio')}>Radio</MenuItem>
        <MenuItem onClick={() => handleTypeMenuItemClick('select')}>Lista Desplegable</MenuItem>
      </Menu>
    </Paper>
  );
};

export default SurveyFormCreator;
