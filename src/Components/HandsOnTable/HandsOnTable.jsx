import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import "./HandsOnTable.css";

const HandsontableComponent = () => {
  return (
    <HotTable
      data={[
        ["ARR Target", "Unit", "Plan", "Description"],
        [
          "ARR at end of  FY'22 ",
          "$",
          "$70,000,000",
          "ARR closed Won (not realised)",
        ],
        [
          "ARR added in  FY'22 ",
          "$",
          "$70,000,000",
          "ARR closed Won (not realised)",
        ],
        [
          "Additional target ARR in FY'23 ",
          "$",
          "$70,000,000",
          "ARR closed Won (not realised)",
        ],
      ]}
      rowHeaders={true}
      colHeaders={true}
      stretchH="all"
      licenseKey="non-commercial-and-evaluation" // for non-commercial use only
    />
  );
};

export default HandsontableComponent;
