import React, { useState, useEffect } from "react";
import jsonData from "../../assets/data2.json";
import MainGeographyRow from "../MainGeographyRow/MainGeographyRow.jsx";
import { Button, Input, Table, TableCell } from "semantic-ui-react";
import MainGeographySales from "../MainGeographyRow/MainGeoSales.jsx";
import "./NewSalesTable.css";

const NewSalesTable = () => {
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

  const productKeys = ["SDR", "BDR", "AE", "Total"];

  return (
    <div className="table-container">
      <Table className="ui table blue striped">
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              {newMainGeoEditable ? (
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
              )}
              Geography
            </Table.Cell>
            <Table.Cell>Product</Table.Cell>
            <Table.Cell>SDR(Inbound)</Table.Cell>
            <Table.Cell>BDR(Outbound)</Table.Cell>
            <Table.Cell>AE</Table.Cell>
            <Table.Cell>Total</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((mainGeo, index) => (
            <MainGeographySales
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
                    (productSum, productKey) =>
                      mainGeo[productKey] + productSum,
                    0
                  ),
                0
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div className="adjust-button-container">
        <Button className="ui blue button" onClick={addProductColumn}>
          Add New Product Column
        </Button>
      </div>
    </div>
  );
};

export default NewSalesTable;
