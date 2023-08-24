import React, { useState } from "react";
import jsonData from "../../assets/data.json";
import MainGeographyRow from "../MainGeographyRow";
import { Button, Input, Table } from "semantic-ui-react";
import "./TableComponent.css";

const TableComponent = () => {
  const [data, setData] = useState(jsonData);
  const [newMainGeoEditable, setNewMainGeoEditable] = useState(false);
  const [newMainGeoName, setNewMainGeoName] = useState("");

  const addMainGeography = () => {
    const newMainGeo = {
      Geography: newMainGeoName,
      "Product 1": 0,
      "Product 2": 0,
      "Product 3": 0,
      sub_geographies: [],
    };
    setData([...data, newMainGeo]);
    setNewMainGeoEditable(false);
  };

  const adjustTotals = () => {
    const adjustedData = data.map((mainGeo) => {
      const total = mainGeo.sub_geographies.reduce(
        (acc, subGeo) =>
          acc + subGeo["Product 1"] + subGeo["Product 2"] + subGeo["Product 3"],
        0
      );

      return {
        ...mainGeo,
        ["Product 1"]: total,
        ["Product 2"]: total,
        ["Product 3"]: total,
      };
    });

    setData(adjustedData);
  };

  return (
    <div className="table-container">
      <table className="ui table blue striped">
        <thead>
          <tr>
            <th>
              {newMainGeoEditable ? (
                <Input
                  placeholder="Enter Name"
                  value={newMainGeoName}
                  onChange={(e) => setNewMainGeoName(e.target.value)}
                  onBlur={addMainGeography}
                  autoFocus
                />
              ) : (
                <Button
                  className="add-button"
                  icon="plus"
                  onClick={() => setNewMainGeoEditable(true)}
                />
              )}
              Product/Geography
            </th>
            <th>Product 1</th>
            <th>Product 2</th>
            <th>Product 3</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mainGeo, index) => (
            <MainGeographyRow
              key={mainGeo.Geography}
              mainGeo={mainGeo}
              data={data}
              setData={setData}
            />
          ))}
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell>
              {data.reduce((sum, mainGeo) => sum + mainGeo["Product 1"], 0)}
            </Table.Cell>
            <Table.Cell>
              {data.reduce((sum, mainGeo) => sum + mainGeo["Product 2"], 0)}
            </Table.Cell>
            <Table.Cell>
              {data.reduce((sum, mainGeo) => sum + mainGeo["Product 3"], 0)}
            </Table.Cell>
            <Table.Cell>
              {data.reduce(
                (sum, mainGeo) =>
                  sum +
                  mainGeo["Product 1"] +
                  mainGeo["Product 2"] +
                  mainGeo["Product 3"],
                0
              )}
            </Table.Cell>
          </Table.Row>
        </tbody>
      </table>
      <div className="adjust-button-container">
        <Button className="ui blue button" onClick={adjustTotals}>
          Adjust Totals
        </Button>
      </div>
    </div>
  );
};

export default TableComponent;
