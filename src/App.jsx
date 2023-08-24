import React from "react";
import "./App.css";
//import DataTable from "./Components/DataTable";
//import "./Components/DataTable.css";
import TableComponent from "./Components/TableComponent/TableComponent";

function App() {
  return (
    <div className="App">
      <h3>ARR Target by Product and Geography in FY"23</h3>
      <TableComponent />
    </div>
  );
}

export default App;
