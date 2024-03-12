import { useState } from 'react';
import { PaperWrapper } from "../components/PaperWrapper";
import axios from '../api/api';

const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await csrf();
        setErrors([])
        setStatus(null)
        try {
            const response = await axios.post("/forgot-password", {email});
            setStatus(response.data.status);
            
        } catch (e) {
            if(e.response.status === 422) {
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
        {status && <div className="bg-green-700 m-2 p-2 rounded text-white">{status}</div>}    
          <div className="mb-10 text-center md:mb-16">Web Encuestas</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
                  focus-visible:shadow-none
                "
              />
              {errors.email && (
                <div className="flex">
                  <span className="text-red-400 text-sm m-2 p-2">
                    {errors.email[0]}
                  </span>
                </div>
              )}
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
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </PaperWrapper>
  )
}

export default ForgotPassword