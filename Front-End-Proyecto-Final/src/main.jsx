import React from 'react'
import ReactDOM from 'react-dom/client'
import SurveyDisplayComponent from './components/SurveyDisplayComponent.jsx'
import SurveyCreatorComponent from './components/SurveyCreatorComponent.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SurveyCreatorComponent></SurveyCreatorComponent>
 
  </React.StrictMode>,
)
