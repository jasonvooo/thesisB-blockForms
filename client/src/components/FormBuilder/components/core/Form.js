import React from "react";

import FormActionsContainer from "./../../containers/builder/FormActionsContainer";
import SchemaField from "../../lib/react-jsonschema-form-0.40.0/src/components/fields/SchemaField.js";

export default function Form(props) {
  const {error} = props;

  const registry = {
    ...SchemaField.defaultProps.registry,
    fields: {
      ...SchemaField.defaultProps.registry.fields,
      SchemaField: props.SchemaField,
      TitleField: props.TitleField,
      DescriptionField: props.DescriptionField,
    }
  };

  const handleSubmit = function(data) {
    return props.onSubmit(data.form);
  }

  return (
    <div>
      {error ? <div className="alert alert-danger">{error}</div> : <div/>}
      <div className="rjsf builder-form">
        <SchemaField {...props} registry={registry} />
      </div>

      <FormActionsContainer {...props} onSubmit={handleSubmit} />
    </div>
  );
}
