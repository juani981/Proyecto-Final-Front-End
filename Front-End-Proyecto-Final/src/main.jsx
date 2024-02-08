import React from "react";
import "tailwindcss/tailwind.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicTabs from "./components/BasicTabs";
import SurveyDisplayComponent from "./pages/encuesta/SurveySubmit";
import SurveyCreatorComponent from "./pages/encuesta/SurveyCreator";
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BasicTabs />
    </BrowserRouter>
  </React.StrictMode>
);
