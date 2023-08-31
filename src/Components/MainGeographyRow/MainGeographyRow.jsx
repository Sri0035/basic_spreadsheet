import React, { useState, useEffect } from "react";
import { Button, Input, Table } from "semantic-ui-react";
import { IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SubGeographyRow from "../SubGeographyRow/SubGeographyRow";
import "./MainGeographyRow.css";

function sumObjectValues(obj) {
  return Object.values(obj).reduce((total, value) => total + value, 0);
}

const EditableCell = ({ content, onChange }) => {
  const [editableContent, setEditableContent] = useState(content);

  const handleContentChange = (event) => {
    const newContent = event.target.textContent;
    setEditableContent(newContent);
    onChange(newContent);
  };

  return (
    <div
      className="editable-cell"
      contentEditable
      onBlur={handleContentChange}
      dangerouslySetInnerHTML={{ __html: editableContent }}
    />
  );
};

const MainGeographyRow = ({
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
  const [nextProductNumber, setNextProductNumber] = useState(4);

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

  const handleTotalChange = (event) => {
    const newData = [
      {
        Geography: "North America",
        "Product 1": 95000000,
        "Product 2": 2500000,

        sub_geographies: [
          {
            Geography: "United States",
            "Product 1": 7500000,
            "Product 2": 1900000,
          },
          {
            Geography: "Canada",
            "Product 1": 2000000,
            "Product 2": 600000,
          },
        ],
      },
      {
        Geography: "Europe",
        "Product 1": 4500000,
        "Product 2": 1000000,

        sub_geographies: [
          {
            Geography: "United Kingdom",
            "Product 1": 1400000,
            "Product 2": 175000,
          },
          {
            Geography: "Germany",
            "Product 1": 1700000,
            "Product 2": 650000,
          },
          {
            Geography: "France",
            "Product 1": 1400000,
            "Product 2": 175000,
          },
        ],
      },
    ];

    setData(newData);

    // You might also want to update individual products if needed
  };

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
              {/* <Button
                className="ui icon button"
                onClick={() => setNewSubGeoEditable(true)}
                icon="plus"
              /> */}
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
            <EditableCell
              content={mainGeo[productKey]}
              onChange={(newContent) => {
                const newValue = parseInt(newContent, 10) || 0;
                const updatedMainGeo = {
                  ...mainGeo,
                  [productKey]: newValue,
                };
                setData((prevData) =>
                  prevData.map((dataMainGeo) =>
                    dataMainGeo === mainGeo ? updatedMainGeo : dataMainGeo
                  )
                );
              }}
            />
          </Table.Cell>
        ))}
        <Table.Cell>
          <EditableCell
            content={sumObjectValues(calculateMainGeoTotal(mainGeo))}
          />

          <IconButton onClick={handleTotalChange}>
            <CheckCircleIcon />
          </IconButton>
        </Table.Cell>
      </Table.Row>
      {isExpanded && (
        <SubGeographyRow
          subGeos={mainGeo.sub_geographies}
          setData={setData}
          productKeys={productKeys}
          Geography={mainGeo.Geography}
          setMainGeoTotal={setMainGeoTotal}
          mainGeoTotal={mainGeoTotal}
        />
      )}
    </React.Fragment>
  );
};

export default MainGeographyRow;
