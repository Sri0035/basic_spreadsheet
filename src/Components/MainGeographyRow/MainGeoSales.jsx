import React, { useState, useEffect } from "react";
import { Button, Input, Table, Dropdown } from "semantic-ui-react";
import SubGeographyRow from "../SubGeographyRow/SubGeographyRow";
import "./MainGeographySales.css";
import SubGeographySales from "../SubGeographyRow/SubGeoSales";

function sumObjectValues(obj) {
  return Object.values(obj).reduce((total, value) => total + value, 0);
}

const products = ["Product 1", "Product 2", "Product 3"];
const MainGeographySales = ({
  mainGeo,
  data,
  setData,
  productKeys,
  mainGeoTotal,
  setMainGeoTotal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSubGeoEditable, setNewSubGeoEditable] = useState(false);
  const [newSubGeoName, setNewSubGeoName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("All Products");

  const calculateMainGeoTotal = () => {
    const productTotal = {};
    productKeys.forEach((productKey) => {
      productTotal[productKey] = mainGeo.sub_geographies.reduce(
        (total, subGeo) => total + subGeo[productKey],
        0
      );
    });

    return productTotal;
  };

  useEffect(() => {
    setMainGeoTotal(calculateMainGeoTotal(mainGeo));
  }, [mainGeo.sub_geographies]);

  const calculateAdjustedTotal = (mainGeoData) => {
    const productKeys = Object.keys(mainGeoData).filter((key) =>
      key.includes("Product")
    );
    return productKeys.reduce((total, key) => total + mainGeoData[key], 0);
  };

  const [adjustedTotal, setAdjustedTotal] = useState(
    calculateAdjustedTotal(mainGeo)
  );

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const addSubGeography = () => {
    const newSubGeo = {
      Geography: newSubGeoName,
      "Product 1": 0,
      "Product 2": 0,
      "Product 3": 0,
      [`Product ${productKeys.length + 1}`]: 0,
    };
    const updatedMainGeo = {
      ...mainGeo,
      sub_geographies: [...mainGeo.sub_geographies, newSubGeo],
    };
    if (newSubGeoName === "") {
      alert("Please enter a name for the new Main geography");
      return;
    }
    setData((prevData) =>
      prevData.map((dataMainGeo) =>
        dataMainGeo === mainGeo ? updatedMainGeo : dataMainGeo
      )
    );
    setNewSubGeoEditable(false);
  };

  //   const handleProductChange = (e, productKey) => {
  //     const newValue = parseInt(e.target.value, 10) || 0;
  //     const updatedMainGeo = {
  //       ...mainGeo,
  //       [productKey]: newValue,
  //     };
  //     setData((prevData) =>
  //       prevData.map((dataMainGeo) =>
  //         dataMainGeo === mainGeo ? updatedMainGeo : dataMainGeo
  //       )
  //     );
  //   };

  useEffect(() => {
    setAdjustedTotal(calculateAdjustedTotal(mainGeo));
  }, [mainGeo]);

  const handleProductChange = (event, data) => {
    setSelectedProduct(data.value);
  };

  return (
    <React.Fragment key={mainGeo.Geography}>
      <Table.Row className={`row ${isExpanded ? "expanded" : ""}`}>
        <Table.Cell>
          <Button
            className="ui icon button"
            onClick={handleExpandClick}
            icon={isExpanded ? "chevron down" : "chevron right"}
          />
        </Table.Cell>
        <Table.Cell>
          {newSubGeoEditable ? (
            <Input
              placeholder="Enter Name"
              value={newSubGeoName}
              onChange={(e) => setNewSubGeoName(e.target.value)}
              onBlur={addSubGeography}
              autoFocus
            />
          ) : (
            <>
              {/* <Button
                className="ui icon button"
                onClick={() => setNewSubGeoEditable(true)}
                icon="plus"
              /> */}

              {mainGeo.Geography}
            </>
          )}
        </Table.Cell>

        {productKeys.map((productKey) => (
          <Table.Cell key={productKey}>{mainGeo[productKey]}</Table.Cell>
        ))}
      </Table.Row>
      {isExpanded && (
        <SubGeographySales
          subGeos={mainGeo.sub_geographies}
          setData={setData}
          productKeys={productKeys}
          Geography={mainGeo.Geography}
          setMainGeoTotal={setMainGeoTotal}
          mainGeoTotal={mainGeoTotal}
          produdcts={products}
        />
      )}
    </React.Fragment>
  );
};

export default MainGeographySales;
