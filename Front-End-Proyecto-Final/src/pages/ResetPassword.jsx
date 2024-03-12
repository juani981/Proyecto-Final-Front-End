import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PaperWrapper } from "../components/PaperWrapper";
import axios from '../api/api';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [SearchParams] = useSearchParams();
  const { token } = useParams();

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  useEffect(() => {
    setEmail(SearchParams.get(email))
    console.log(email);
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    await csrf();
    setErrors([])
    setStatus(null)
    try {
      const response = await axios.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation
      });
      setStatus(response.data.status);

    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
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
            md:px-[60px]"
          >
            {status && 
            <div className="bg-green-700 m-2 p-2 rounded text-white">
              {status}
              <div>
                Ir a <Link to={"/login"}>Inicio de Sesión</Link>
              </div>
            </div>}
            <div className="mb-10 text-center md:mb-16">Web Encuestas</div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="
                  bordder-[#E9EDF4]
                  w-full
                  rounded-md
                  border
                  bg-[#FCFDFE]
                  py-3
                  px-5
                  text-base text-body-color
                  placeholder-[#ACB6BE]
                  outline-none
                  focus:border-primary
                  focus-visible:shadow-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirme su contraseña"
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="
                    bordder-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    bg-[#FCFDFE]
                    py-3
                    px-5
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none"
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
                  Restaurar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PaperWrapper>
  )
}

export default ResetPassword