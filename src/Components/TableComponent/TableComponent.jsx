import React, { useState, useEffect } from "react";
import jsonData from "../../assets/data.json";
import MainGeographyRow from "../MainGeographyRow/MainGeographyRow";
import { Button, Input, Table } from "semantic-ui-react";
import "./TableComponent.css";
import InfoButton from "../InfoButton/InfoButton";

const TableComponent = () => {
  const [data, setData] = useState(jsonData);
  const [newMainGeoEditable, setNewMainGeoEditable] = useState(false);
  const [newMainGeoName, setNewMainGeoName] = useState("");
  const [nextProductNumber, setNextProductNumber] = useState(4);
  const [mainGeoTotal, setMainGeoTotal] = useState({});

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

  const addProductColumn = () => {
    const newProductColumnName = `Product ${nextProductNumber}`;

    setNextProductNumber(nextProductNumber + 1); // Increment the next product number

    setData((prevData) =>
      prevData.map((mainGeo) => ({
        ...mainGeo,
        [newProductColumnName]: 0,
      }))
    );
  };

  const productKeys = [
    ...new Set(
      data.flatMap((mainGeo) =>
        Object.keys(mainGeo).filter((key) => key.includes("Product"))
      )
    ),
  ];

  return (
    <div className="table-container">
      <Table celled>
        <Table.Header className="header">
          <Table.Cell colSpan={4}>
            ARR Target by Product and Geography in FY'23
            <InfoButton content={"Based on proportions from CRM data"} />
          </Table.Cell>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              {/* {newMainGeoEditable ? (
                <Input
                  className="input-field"
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
              )} */}
              Geography
            </Table.Cell>
            {productKeys.map((productKey) => (
              <th key={productKey}>{productKey}</th>
            ))}
            <th>Total</th>
          </Table.Row>
        </Table.Header>

        {data.map((mainGeo, index) => (
          <MainGeographyRow
            key={mainGeo.Geography}
            mainGeo={mainGeo}
            data={data}
            setData={setData}
            productKeys={productKeys}
            mainGeoTotal={mainGeoTotal}
            setMainGeoTotal={setMainGeoTotal}
          />
        ))}
        <Table.Row>
          <Table.Cell>Total</Table.Cell>
          {productKeys.map((productKey) => (
            <Table.Cell key={productKey}>
              {data.reduce((sum, mainGeo) => sum + mainGeo[productKey], 0)}
            </Table.Cell>
          ))}
          <Table.Cell>
            {data.reduce(
              (sum, mainGeo) =>
                sum +
                productKeys.reduce(
                  (productSum, productKey) => mainGeo[productKey] + productSum,
                  0
                ),
              0
            )}
          </Table.Cell>
        </Table.Row>
      </Table>
      {/* <div className="adjust-button-container">
        <Button className="ui blue button" onClick={addProductColumn}>
          Add New Product Column
        </Button>
      </div> */}
    </div>
  );
};

export default TableComponent;
