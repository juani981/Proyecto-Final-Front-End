import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SurveyForm from './SurveyFormComponent.jsx'
import SurveyFormCreator from './SurveyFormCreator.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SurveyForm></SurveyForm>
  </React.StrictMode>,
)
