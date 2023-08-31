import React from "react";
import { Button, Icon, Popup } from "semantic-ui-react";
import "./InfoButton.css"; // Import your custom CSS file

const InfoButton = ({ content }) => {
  return (
    <Popup
      content={content}
      trigger={
        <Button circular icon className="info-button">
          <Icon name="info" />
        </Button>
      }
    />
  );
};

export default InfoButton;
