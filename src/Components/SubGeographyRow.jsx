import React from "react";
import { Input, Table } from "semantic-ui-react";

const SubGeographyRow = ({ subGeos, setData, productKeys }) => {
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
          {productKeys.map((productKey) => (
            <Table.Cell key={productKey}>
              <Input
                type="number"
                value={subGeo[productKey]}
                onChange={(e) => handleProductChange(e, index, productKey)}
              />
            </Table.Cell>
          ))}
          <Table.Cell>
            {productKeys.reduce(
              (sum, productKey) => sum + subGeo[productKey],
              0
            )}
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default SubGeographyRow;
