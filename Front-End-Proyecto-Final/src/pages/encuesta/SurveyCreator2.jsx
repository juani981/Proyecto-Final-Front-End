import { useState } from "react";
import { TextField } from "@mui/material";
import { PaperWrapper } from "../../components/PaperWrapper";
import { useNavigate } from 'react-router-dom';
import axios from '../../api/api';


const SurveyCreatorComponent = () => {
  const [titulo_encuesta, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();
  // const handleTitleChange = (event) => {
  //   //code here to update the title of the survey in state.
  //   console.log(event.target.value);
  //   setTitulo(event.target.value);
  // };

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await csrf();
    try {
      const { data } = await axios.post("/api/encuestas", { titulo_encuesta, descripcion });
      // const encuestaId = data.id;
      navigate("/pages/encuesta/QuestionsCreator", { state: { data } });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <PaperWrapper>
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div
            className="
              relative
              mx-auto
              max-w-[525px]
              overflow-hidden
              rounded-lg
              bg-white
              py-16
              px-10
              text-center
              sm:px-12
              md:px-[60px]
            ">
            <div className="mb-10 text-center md:mb-16">Web Encuestas</div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <TextField
                  label="Título"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={titulo_encuesta}
                  onChange={(e) => setTitulo(e.target.value)}
                  // InputProps={{
                  //   readOnly: readOnlyFlag,
                  // }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="mb-4">
                <TextField
                  label="Descripción"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  // InputProps={{
                  //   readOnly: readOnlyFlag,
                  // }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="mb-10">
                <button
                  type="submit"
                  className="
                    w-full
                    px-4
                    py-3
                    bg-indigo-500
                    hover:bg-indigo-700
                    rounded-md
                    text-white
                  ">
                  Crear encuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PaperWrapper>
  );
};
export default SurveyCreatorComponent;
