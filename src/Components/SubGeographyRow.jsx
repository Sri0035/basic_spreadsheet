import React from "react";
import { Button, Input, Table } from "semantic-ui-react";

const SubGeographyRow = ({ subGeos, setData }) => {
  const handleProductChange = (e, subGeoIndex, productKey) => {
    const newValue = parseInt(e.target.value, 10) || 0;

    const updatedSubGeos = subGeos.map((subGeo, index) => {
      if (index === subGeoIndex) {
        return {
          ...subGeo,
          [productKey]: newValue,
        };
      }
      return subGeo;
    });

    setData((prevData) =>
      prevData.map((mainGeo) => ({
        ...mainGeo,
        sub_geographies: mainGeo.sub_geographies.map((subGeo, index) =>
          index === subGeoIndex ? updatedSubGeos[subGeoIndex] : subGeo
        ),
      }))
    );
  };

  return (
    <>
      {subGeos.map((subGeo, index) => (
        <Table.Row className="sub-row" key={subGeo.Geography}>
          <Table.Cell>{subGeo.Geography}</Table.Cell>
          <Table.Cell>
            <Input
              type="number"
              value={subGeo["Product 1"]}
              onChange={(e) => handleProductChange(e, index, "Product 1")}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              type="number"
              value={subGeo["Product 2"]}
              onChange={(e) => handleProductChange(e, index, "Product 2")}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              type="number"
              value={subGeo["Product 3"]}
              onChange={(e) => handleProductChange(e, index, "Product 3")}
            />
          </Table.Cell>
          <Table.Cell>
            {subGeo["Product 1"] + subGeo["Product 2"] + subGeo["Product 3"]}
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default SubGeographyRow;
