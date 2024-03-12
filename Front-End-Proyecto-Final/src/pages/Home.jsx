import { useState, useEffect } from "react";
import useAuthContext from "../context/AuthContext";

const Home = () => {
  const { user, getUser } = useAuthContext();
  const [mensaje, setMensaje] = useState("");
  useEffect( () => {
    if(!user) {
      setMensaje("Hola, inicie sesión");
    } else {
      setMensaje(`Bienvenido ${user.name}`);
    }
  }, []);
  return <div>{mensaje}</div>
}

export default Home
