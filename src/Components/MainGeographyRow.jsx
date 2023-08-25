import React, { useState, useEffect } from "react";
import { Button, Input, Table } from "semantic-ui-react";
import SubGeographyRow from "./SubGeographyRow";

const MainGeographyRow = ({ mainGeo, data, setData, productKeys }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSubGeoEditable, setNewSubGeoEditable] = useState(false);
  const [newSubGeoName, setNewSubGeoName] = useState("");
  const [nextProductNumber, setNextProductNumber] = useState(4);

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
      alert("Please enter a name for the new Subgeography");
      return;
    }
    setData((prevData) =>
      prevData.map((dataMainGeo) =>
        dataMainGeo === mainGeo ? updatedMainGeo : dataMainGeo
      )
    );
    setNewSubGeoEditable(false);
  };

  const handleProductChange = (e, productKey) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    const updatedMainGeo = {
      ...mainGeo,
      [productKey]: newValue,
    };
    setData((prevData) =>
      prevData.map((dataMainGeo) =>
        dataMainGeo === mainGeo ? updatedMainGeo : dataMainGeo
      )
    );
  };

  useEffect(() => {
    setAdjustedTotal(calculateAdjustedTotal(mainGeo));
  }, [mainGeo]);

  console.log(productKeys);

  return (
    <React.Fragment key={mainGeo.Geography}>
      <Table.Row className={`row ${isExpanded ? "expanded" : ""}`}>
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
              <Button
                className="ui icon button"
                onClick={() => setNewSubGeoEditable(true)}
                icon="plus"
              />
              <Button
                className="ui icon button"
                onClick={handleExpandClick}
                icon={isExpanded ? "chevron down" : "chevron right"}
              />
              {mainGeo.Geography}
            </>
          )}
        </Table.Cell>
        {productKeys.map((productKey) => (
          <Table.Cell key={productKey}>
            <Input
              value={mainGeo[productKey]}
              onChange={(e) => handleProductChange(e, productKey)}
            />
          </Table.Cell>
        ))}
        <Table.Cell>{adjustedTotal}</Table.Cell>
      </Table.Row>
      {isExpanded && (
        <SubGeographyRow
          subGeos={mainGeo.sub_geographies}
          setData={setData}
          productKeys={productKeys}
          Geography={mainGeo.Geography}
        />
      )}
    </React.Fragment>
  );
};

export default MainGeographyRow;
