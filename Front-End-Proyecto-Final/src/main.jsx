import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicTabs from "./components/BasicTabs";
import SurveyDisplayComponent from "./pages/SurveySubmit";
import SurveyCreatorComponent from "./pages/SurveyCreator";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BasicTabs /> {/* Use the BasicTabs component as the navigation bar */}
      <Routes>
        <Route
          path="/pages/SurveyCreator"
          element={<SurveyCreatorComponent />}
        />
        <Route
          path="/pages/SurveySubmit"
          element={<SurveyDisplayComponent />}
        />
        {/* Add more routes for other pages if needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
