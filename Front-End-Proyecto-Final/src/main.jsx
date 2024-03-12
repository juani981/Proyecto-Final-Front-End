import React from "react";
import "tailwindcss/tailwind.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasicTabs from "./components/BasicTabs";
import { AuthProvider } from "./context/AuthContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>        
        <BasicTabs />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
