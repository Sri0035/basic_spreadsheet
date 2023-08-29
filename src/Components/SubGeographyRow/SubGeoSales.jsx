import React, { useState } from "react";
import { Input, Table, Dropdown } from "semantic-ui-react";

const products = ["Product 1", "Product 2", "Product 3"];

const SubGeographySales = ({
  subGeos,
  setData,
  productKeys,
  Geography,
  setMainGeoTotal,
  mainGeoTotal,
}) => {
  const handleValueChange = (e, subGeoIndex, productKey) => {
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

  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const handleProductChange = (event, data) => {
    setSelectedProduct(data.value);
  };

  return (
    <>
      {subGeos.map((subGeo, index) => (
        <Table.Row className="sub-row" key={subGeo.Geography}>
          <Table.Cell>{subGeo.Geography}</Table.Cell>
          <Table.Cell className="table-dropdown-cell">
            <div className="dropdown-container">
              <Dropdown
                className="dropdown"
                placeholder="Select Product"
                options={[
                  { key: "all", value: "All Products", text: "All Products" },
                  ...products.map((product) => ({
                    key: product,
                    value: product,
                    text: product,
                  })),
                ]}
                selection
                value={selectedProduct}
                onChange={handleProductChange}
              />
            </div>
          </Table.Cell>
          {productKeys.map((productKey) => (
            <Table.Cell key={productKey}>
              <Input
                style={{ border: "none", boxShadow: "none", padding: "0px" }}
                type="number"
                value={subGeo[productKey]}
                onChange={(e) => handleValueChange(e, index, productKey)}
              />
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </>
  );
};

export default SubGeographySales;
