import React, { useState, useEffect } from "react";
import { Button, Input, Table } from "semantic-ui-react";
import SubGeographyRow from "./SubGeographyRow";

const MainGeographyRow = ({ mainGeo, data, setData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSubGeoEditable, setNewSubGeoEditable] = useState(false);
  const [newSubGeoName, setNewSubGeoName] = useState("");
  const [adjustedTotal, setAdjustedTotal] = useState(
    mainGeo["Product 1"] + mainGeo["Product 2"] + mainGeo["Product 3"]
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
    };
    const updatedMainGeo = {
      ...mainGeo,
      sub_geographies: [...mainGeo.sub_geographies, newSubGeo],
    };
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
    setAdjustedTotal(
      mainGeo["Product 1"] + mainGeo["Product 2"] + mainGeo["Product 3"]
    );
  }, [mainGeo]);

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
        <Table.Cell>
          <Input
            value={mainGeo["Product 1"]}
            onChange={(e) => handleProductChange(e, "Product 1")}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            value={mainGeo["Product 2"]}
            onChange={(e) => handleProductChange(e, "Product 2")}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            value={mainGeo["Product 3"]}
            onChange={(e) => handleProductChange(e, "Product 3")}
          />
        </Table.Cell>
        <Table.Cell>{adjustedTotal}</Table.Cell>
      </Table.Row>
      {isExpanded && (
        <SubGeographyRow subGeos={mainGeo.sub_geographies} setData={setData} />
      )}
    </React.Fragment>
  );
};

export default MainGeographyRow;
