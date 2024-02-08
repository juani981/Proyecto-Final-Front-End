import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SurveyDisplayComponent from "../pages/encuesta/SurveySubmit";
import SurveyCreatorComponent from "../pages/encuesta/SurveyCreator";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const CustomTabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const BasicTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="grid justify-end bg-indigo-900 text-white px-2 py-2.5 sm:px-4 mb-4">
        <Box sx={{}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="inherit">
            <Tab
              label="Web Encuestas (Logo placeholder)"
              component={Link}
              to="/pages/Home"
            />
            <Tab label="Login" component={Link} to="/pages/Login" />
            <Tab label="Registrar" component={Link} to="/pages/Register" />
            <Tab
              label="Survey Creator"
              component={Link}
              to="/pages/encuesta/SurveyCreator"
            />
            <Tab
              label="Survey Submit"
              component={Link}
              to="/pages/encuesta/SurveySubmit"
            />
          </Tabs>
        </Box>
      </div>
      <CustomTabPanel value={value} index={0}>
        <Routes>
          <Route path="/pages/Home" element={<Home />} />
        </Routes>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Routes>
          <Route path="/pages/Login" element={<Login />} />
        </Routes>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Routes>
          <Route path="/pages/Register" element={<Register />} />
        </Routes>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Routes>
          <Route
            path="/pages/encuesta/SurveyCreator"
            element={<SurveyCreatorComponent />}
          />
        </Routes>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Routes>
          <Route
            path="/pages/encuesta/SurveySubmit"
            element={<SurveyDisplayComponent />}
          />
        </Routes>
      </CustomTabPanel>
    </Box>
  );
};

export default BasicTabs;
