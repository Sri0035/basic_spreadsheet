import * as React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import TwoTables from "./Components/TwoTables/TwoTables";
import NewSalesTable from "./Components/NewSalesTable/NewSalesTable";
import TableComponent from "./Components/TableComponent/TableComponent";
import ARRExist from "./Components/ARRExist/ARRExist";
import "./App.css";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TwoTables />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Geography" {...a11yProps(0)} />
            <Tab label="HeadCount" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ARRExist />
          {/* <TableComponent /> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <NewSalesTable title={"Existing Head Count- New Sales"} />
          <NewSalesTable title={"Existing Head Count- Retention / farming"} />
        </CustomTabPanel>
      </Box>
    </>
  );
}
