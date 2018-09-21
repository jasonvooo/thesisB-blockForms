import React from "react";
import FieldListDropdown from "./FieldListDropdown";
import {Button, ButtonToolbar, ButtonGroup}  from "reactstrap";

export default function FormActions(props) {
  const handleClick = (event) => {
    props.publishForm((data) => {
      return props.onSubmit(data);
    });
  };

  let saveIconClass;
  if (props.status == "pending") {
    saveIconClass = "fa fa-circle-notch fa-spin";
  } else {
    saveIconClass = "fa fa-save";
  }

  return (
    <div>
      {/*<header>*/}
        <ButtonToolbar className="builder-inner-actions">
          <FieldListDropdown className="pull-right" {...props}>
            <i className="fa fa-plus" /> Add field
          </FieldListDropdown>
        </ButtonToolbar>
      {/*</header>*/}

      {/*<footer>*/}
        <Button bsStyle="success" onClick={handleClick}>
          <i className={`${saveIconClass}`} /> Save your form
        </Button>
      {/*</footer>*/}
    </div>
  );
}
