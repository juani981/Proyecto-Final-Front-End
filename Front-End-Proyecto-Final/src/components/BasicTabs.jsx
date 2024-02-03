import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

const SurveyCreatorContent = () => (
  <Typography>Survey Creator Content</Typography>
);

const SurveySubmitContent = () => (
  <Typography>Survey Submit Content</Typography>
);

const BasicTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab
            label="Survey Creator"
            component={Link}
            to="/pages/SurveyCreator"
          />
          <Tab
            label="Survey Submit"
            component={Link}
            to="/pages/SurveySubmit"
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Routes>
          <Route path="/" element={<SurveyCreatorContent />} />
        </Routes>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Routes>
          <Route path="/" element={<SurveySubmitContent />} />
        </Routes>
      </CustomTabPanel>
    </Box>
  );
};

export default BasicTabs;
