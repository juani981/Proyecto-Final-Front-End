import { useState } from "react";
import { TextField, Input, FormGroup, FormControl, InputLabel, Button, styled } from "@mui/material";
import { Textarea } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/api';

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% 0 0 25%;
  & > div {
      margin-top: 20px;
`;

const SurveyCreatorComponent = () => {
  const [titulo_encuesta, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  // const handleTitleChange = (event) => {
  //   //code here to update the title of the survey in state.
  //   console.log(event.target.value);
  //   setTitulo(event.target.value);
  // };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    await csrf();
    try {
      const { encuestaData } = await axios.post("/api/encuestas", { titulo_encuesta, descripcion });
      // const encuestaId = data.id;
      navigate("/pages/encuesta/QuestionsCreator", { state: { encuestaData } });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container
      className="
        mx-auto
        max-w-[525px]
        rounded-lg
        bg-white
        text-center
        py-16
        px-10
        sm:px-12
        md:px-[60px]
      "
    >
      <h2>Nueva Encuesta</h2>
      <FormControl>
        <InputLabel htmlFor="titulo">Título</InputLabel>
        <Input //TextField
          required={true}
          fullWidth
          variant="outlined"
          value={titulo_encuesta}
          onChange={(e) => setTitulo(e.target.value)}
          id="titulo"
        />
      </FormControl>
      <FormControl>
        <Textarea
          required={false}
          minRows={2}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Escribe lo que quieras al inicio de tu encuesta...(opcional)"
        />
      </FormControl>
      <FormControl>
        <Button variant="contained" color="primary" onClick={() => handleSubmit()}>Crear encuesta</Button>
      </FormControl>
    </Container>
  );
};
export default SurveyCreatorComponent;
