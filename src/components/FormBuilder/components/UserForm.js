import React, { Component } from "react";
import Form from "../lib/react-jsonschema-form-0.40.0/src/components/Form.js";
import config from "../config";

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    this.props.onSubmit(data.formData);
  }

  render() {
    return (
      <Form 
        schema={this.props.schema} 
        uiSchema={this.props.uiSchema} 
        formData={this.props.formData}
        onSubmit={this.handleSubmit} 
      />
    );
  }
}

export default UserForm;
