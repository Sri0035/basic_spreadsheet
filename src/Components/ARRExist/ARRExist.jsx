import React, { useState } from "react";
import { Table, TableCell, TableRow, Button, Tab } from "semantic-ui-react";
import { Modal, Box, Typography } from "@mui/material";
import InfoButton from "../InfoButton/InfoButton";
import data from "../../assets/sales.json";
import changedData from "../../assets/salesChange.json";
import "./ARRExist.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditableCell = ({ handleOpen, setChangeData, content, onChange }) => {
  const [editableContent, setEditableContent] = useState(content);

  function handleContentChange(event) {
    const newContent = event.target.textContent;
    setEditableContent(newContent);
  }
  return (
    <div
      className="editable-cell"
      contentEditable
      onBlur={handleContentChange}
      dangerouslySetInnerHTML={{ __html: editableContent }}
    />
  );
};

const SubTableRow = ({ handleOpen, setChangeData, data, count }) => {
  console.log(count);
  return (
    <>
      {count.map((count, index) => (
        <TableRow>
          <TableCell>{}</TableCell>
          <TableCell>{count.Country}</TableCell>
          <TableCell>
            <EditableCell
              data={data}
              setChangeData={setChangeData}
              content={count.NewBusiness}
              handleOpen={handleOpen}
            />
          </TableCell>
          <TableCell>
            <EditableCell
              content={count.Existing.Churn}
              setChangeData={setChangeData}
            />
          </TableCell>
          <TableCell>
            <EditableCell
              content={count.Existing.Upsell}
              setChangeData={setChangeData}
            />
          </TableCell>
          <Table.Cell>
            <EditableCell content={count.Total} setChangeData={setChangeData} />
          </Table.Cell>
        </TableRow>
      ))}
    </>
  );
};

const Tablerow = ({ row }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <React.Fragment>
      <Table.Row className={`row ${isExpanded ? "expanded" : ""}`}>
        <TableCell>
          <Button
            className="ui icon button"
            onClick={handleExpandClick}
            icon={isExpanded ? "chevron down" : "chevron right"}
          />
        </TableCell>
        <TableCell>{row.Geography}</TableCell>
        <TableCell>
          <EditableCell content={row.NewBusiness} />
        </TableCell>
        <TableCell>
          <EditableCell content={row.Existing.Churn} />
        </TableCell>
        <TableCell>
          <EditableCell content={row.Existing.Upsell} />
        </TableCell>
        <Table.Cell>
          <EditableCell content={row.Total} />
        </Table.Cell>
      </Table.Row>
      {isExpanded && (
        <SubTableRow
          changeData={setChangeData}
          data={changeData}
          count={row.Countries}
          handleOpen={handleOpen}
        />
      )}
    </React.Fragment>
  );
};

const ARRExist = () => {
  const [changeData, setChangeData] = useState(data);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setChangeData(changedData);
    console.log(changedData);
    console.log("Changed data is:");
    console.log(changeData);
  };

  const newBusinessTotal = data.reduce((sum, row) => sum + row.NewBusiness, 0);
  const ChurnTotal = data.reduce((sum, row) => sum + -row.Existing.Churn, 0);
  const UpsellTotal = data.reduce((sum, row) => sum + row.Existing.Upsell, 0);
  const GrandTotal = data.reduce((sum, row) => sum + row.Total, 0);

  return (
    <>
      <div className="table-container">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
        <Table celled className="ui table ">
          <Table.Header>
            <TableCell colSpan={6} className="header">
              ARR Target by New sales / Existing business and Geography in FY'23
              <div class="info-container">
                <InfoButton
                  className="info"
                  content={"Based on proportions from CRM data"}
                />
              </div>
            </TableCell>
          </Table.Header>
          <Table.Header>
            <TableRow className="headings">
              <TableCell>{}</TableCell>
              <TableCell rowSpan={2}>Geography</TableCell>
              <TableCell rowSpan={2}>New Business</TableCell>
              <TableCell colSpan={2}>Existing Business</TableCell>
              <TableCell rowSpan={2}>Total</TableCell>
            </TableRow>
          </Table.Header>
          <Table.Header>
            <TableRow className="sub-headings">
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell>Churn</TableCell>
              <TableCell>Expansion</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          </Table.Header>
          {data.map((row, index) => (
            <Tablerow key={index} row={row} />
          ))}
          <Table.Row>
            <Table.Cell>{}</Table.Cell>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell>{newBusinessTotal}</Table.Cell>
            <Table.Cell>{-ChurnTotal}</Table.Cell>
            <Table.Cell>{UpsellTotal}</Table.Cell>
            <Table.Cell>{GrandTotal}</Table.Cell>
          </Table.Row>
        </Table>
        <Button onClick={handleOpen}>Change Data</Button>
      </div>
    </>
  );
};

export default ARRExist;
