import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Fab,
  Menu,
  MenuItem,
  Radio,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  InputLabel,
  Grid,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import AddIcon from '@mui/icons-material/Add';
// ... (importaciones)

export const SaveSurveyComponent = ({handleDownloadprop}) => {
  return (
    <>
    
      <Button variant="contained" color="primary" onClick={handleDownloadprop}
          style={{
            marginTop: 40,
          }}>
          Guardar Encuesta
      </Button>
    
    </>
  )
}


