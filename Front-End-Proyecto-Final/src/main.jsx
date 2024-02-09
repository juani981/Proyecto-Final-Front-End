import React from "react";
import "tailwindcss/tailwind.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicTabs from "./components/BasicTabs";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BasicTabs />
    </BrowserRouter>
  </React.StrictMode>
);
