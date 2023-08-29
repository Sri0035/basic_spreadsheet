import React from "react";
import { Table } from "semantic-ui-react";
import "./TwoTables.css";

const SecondTable = () => {
  return (
    <div className="another-table-container">
      <Table celled className="custom-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Segment definition</Table.HeaderCell>
            <Table.HeaderCell>Unit</Table.HeaderCell>
            <Table.HeaderCell>value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>SMB</Table.Cell>
            <Table.Cell>$ARR</Table.Cell>
            <Table.Cell>10,000,000-25,000,000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Mid-Market</Table.Cell>
            <Table.Cell>$ARR</Table.Cell>
            <Table.Cell>25,000,000-250,000,000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Enterprise</Table.Cell>
            <Table.Cell>$ARR</Table.Cell>
            <Table.Cell>250,000,000{">"}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

const TwoTables = () => {
  return (
    <div className="another-table-container">
      <Table celled className="custom-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ARR Target</Table.HeaderCell>
            <Table.HeaderCell>Unit</Table.HeaderCell>
            <Table.HeaderCell>Plan</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* Example data rows */}
          <Table.Row>
            <Table.Cell>ARR at the end of FY'22</Table.Cell>
            <Table.Cell>$</Table.Cell>
            <Table.Cell>70,000,000</Table.Cell>
            <Table.Cell>ARR Closed Won (not realised)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ARR added in FY'22</Table.Cell>
            <Table.Cell>$</Table.Cell>
            <Table.Cell>20,000,000</Table.Cell>
            <Table.Cell>ARR Closed Won (not realised)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Additional target ARR in FY'23</Table.Cell>
            <Table.Cell>$</Table.Cell>
            <Table.Cell>25,000,000</Table.Cell>
            <Table.Cell>ARR Closed Won (not realised)</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <SecondTable />
    </div>
  );
};

export default TwoTables;
