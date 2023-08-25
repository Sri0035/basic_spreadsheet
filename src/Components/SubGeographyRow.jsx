import React from "react";
import { Input, Table } from "semantic-ui-react";

const SubGeographyRow = ({
  subGeos,
  setData,
  productKeys,
  Geography,
  setMainGeoTotal,
  mainGeoTotal,
}) => {
  const handleProductChange = (e, subGeoIndex, productKey) => {
    const newValue = parseInt(e.target.value, 10) || 0;

    setData((prevData) =>
      prevData.map((mainGeo, mainGeoIndex) => {
        if (mainGeo.Geography === Geography) {
          const updatedSubGeos = mainGeo.sub_geographies.map(
            (subGeo, index) => {
              if (index === subGeoIndex) {
                return {
                  ...subGeo,
                  [productKey]: newValue,
                };
              }
              return subGeo;
            }
          );
          const updatedMainGeoTotal = { ...mainGeoTotal };
          updatedMainGeoTotal[productKey] = updatedSubGeos.reduce(
            (sum, subGeo) => sum + subGeo[productKey],
            0
          );

          setMainGeoTotal(updatedMainGeoTotal);

          const maal = {
            Geography,
            ...updatedMainGeoTotal,
            sub_geographies: updatedSubGeos,
          };

          return maal;
        }
        return mainGeo;
      })
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
