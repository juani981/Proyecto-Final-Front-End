import { createContext, useContext, useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        try {
          const { data } = await axios.get('/api/user');
          setUser(data);
        } catch (e) {
          console.log(e);
          setUser(null);
        }
    }

    const login = async ({ email, password}) => {
        await csrf();
        try {
            // si back y front tienen diferentes nombres usar por ej: "user_mail: email"
            await axios.post("/login", { email, password });
            await getUser();
            navigate("/");
          } catch (e) {
            if(e.response.status === 422) {
              setErrors(e.response.data.errors);
            }
          }
    }

    const register = async ({ ...data}) => {
        await csrf();
        try {
            await axios.post("/register", data);
            await getUser();
            navigate("/");
          } catch (e) {
            if(e.response.status === 422) {
              setErrors(e.response.data.errors);
            }
          }
    }

    const logout = async () => {
      axios.post('\logout').then(() => {
        setUser(null);
      }) 
    }

    return <AuthContext.Provider value={{ user, errors, getUser, login, register, logout}}>
        {children}
    </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext);
}
