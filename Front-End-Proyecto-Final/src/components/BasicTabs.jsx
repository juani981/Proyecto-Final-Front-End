import React, { useState } from "react";
import { Link, useRoutes, Routes, Route } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import QuestionsCreatorComponent from "../pages/encuesta/QuestionsCreator";
import AnswersSubmitComponent from "../pages/encuesta/AnswersSubmit";
import SurveyCreatorComponent from "../pages/encuesta/SurveyCreator";//opción2: SurveyCreator2 
import useAuthContext from "../context/AuthContext";

const BasicTabs = () => {
  const [value, setValue] = useState(0);
  const { user, logout } = useAuthContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword/>},
    { path: "/password-reset/:token", element: <ResetPassword/>},
    {
      path: "/pages/encuesta/SurveyCreator",
      element: <SurveyCreatorComponent />,
    },
    {
      path: "/pages/encuesta/QuestionsCreator",
      element: <QuestionsCreatorComponent />,
    },
    {
      path: "/pages/encuesta/AnswersSubmit",
      element: <AnswersSubmitComponent />,
    },
  ]);

  return (
    <Box sx={{ width: "100%" }}>
      <div className="grid justify-end bg-indigo-900 text-white px-2 py-2.5 sm:px-4 mb-4">
        <Box sx={{}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Navigation Bar"
            textColor="inherit">
            {/* {user ? (<></>) : (<></>) } no funciona con tabs (no acepta fragmentos dentro de tabs) */}
            <Tab
              label="Web Encuestas (Logo placeholder)"
              component={Link}
              to="/"
            />
            {!user && <Tab 
              label="Ingresar" 
              component={Link} 
              to="/login" 
            />}
            {user && <Tab 
              label="Nuevo usuario" 
              component={Link} 
              to="/register" 
            />}
            {user && <Tab
              label="Crear encuesta"
              component={Link}
              to="/pages/encuesta/SurveyCreator"
            />}
            {user && <Tab
              label="Questions Creator"
              component={Link}
              to="/pages/encuesta/QuestionsCreator"
            />}
            {user && <Tab
              label="Answers Submit"
              component={Link}
              to="/pages/encuesta/AnswersSubmit"
            />}
            {user && <Tab
              label="Cerrar sesión"
              onClick={logout}
              component={Link}
              to="/"
            />}
            {/* Verificar error al poner un botón dentro de tabs */}
          </Tabs>
        </Box>
      </div>
      {routes}
    </Box>
  );
};

export default BasicTabs;
