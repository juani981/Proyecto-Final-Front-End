import React, { useState } from "react";
import { Link, useRoutes, Routes, Route } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import QuestionsCreatorComponent from "../pages/encuesta/QuestionsCreator";
import AnswersSubmitComponent from "../pages/encuesta/AnswersSubmit";
import SurveyCreatorComponent from "../pages/encuesta/SurveyCreator";

const BasicTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const routes = useRoutes([
    { path: "/pages/Home", element: <Home /> },
    { path: "/pages/Login", element: <Login /> },
    { path: "/pages/Register", element: <Register /> },
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
            <Tab
              label="Web Encuestas (Logo placeholder)"
              component={Link}
              to="/pages/Home"
            />
            <Tab label="Login" component={Link} to="/pages/Login" />
            <Tab label="Registrar" component={Link} to="/pages/Register" />
            <Tab
              label="Crear Encuesta"
              component={Link}
              to="/pages/encuesta/SurveyCreator"
            />
            <Tab
              label="Questions Creator"
              component={Link}
              to="/pages/encuesta/QuestionsCreator"
            />
            <Tab
              label="Answers Submit"
              component={Link}
              to="/pages/encuesta/AnswersSubmit"
            />
          </Tabs>
        </Box>
      </div>
      {routes}
    </Box>
  );
};

export default BasicTabs;
