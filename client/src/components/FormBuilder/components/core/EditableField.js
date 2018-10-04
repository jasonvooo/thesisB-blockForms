import React, { Component } from "react";
import Form from "../../lib/react-jsonschema-form-0.40.0/src/components/Form.js";
import SchemaField from "../../lib/react-jsonschema-form-0.40.0/src/components/fields/SchemaField";
import { ButtonToolbar, Button } from "reactstrap";
import FieldListDropdown from "./FieldListDropdown";

import { dirname } from "path";
/**
 * Recopies the keys listed in "source" using the values in the "target"
 * object, excluding keys listed in the "excludedKey" argument.
 **/
function pickKeys(source, target, excludedKeys) {
  const result = {};

  let isExcluded;
  for (let key in source) {
    isExcluded = excludedKeys.indexOf(key) !== -1;
    if (isExcluded) {
      continue;
    }
    
    result[key] = target[key];
  }

  return result;
}

function shouldHandleDoubleClick(node) {
  // disable doubleclick on number input, so people can use inc/dec arrows
  if (node.tagName === "INPUT" &&
      node.getAttribute("type") === "number") {
    return false;
  }
  return true;
}

class FieldPropertiesEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {editedSchema: props.schema};
  }

  onChange({formData}) {
    // this.setState({editedSchema: formData});
  }

  render() {
    const {schema, name, required, uiSchema, onCancel, onUpdate, onDelete} = this.props;
    const formData = {
      ...schema,
      required,
      ...this.state.editedSchema,
      name: this.state.name
    };

    return (
      <div className="card field-editor">
        <div className="card-header">
            <h2 className="card-title">Edit {name} <Button bsStyle="link" name="close-btn" onClick={onCancel} className="float-right"><i className="fa fa-times" /></Button></h2>
        </div>
        <div className="card-body">
          <Form
            schema={uiSchema.editSchema}
            formData={formData}
            onChange={this.onChange.bind(this)}
            FieldTemplate={function(props) {
              const {id, classNames, label, help, required, description, errors, children} = props;
        
              return (
                <div className={"form-group " + classNames}>
                  <label htmlFor={id}>{label} {required ? "*" : null}</label>
                  {description}
                  {children}
                  {errors}
                  {help}
                </div>
              );
            }.bind(this)}
            onSubmit={onUpdate}
            >
            <button type="submit" className="btn btn-info pull-right">Submit</button>
          </Form>
        </div>
      </div>
    );
  }
}

function FieldContainer(props) {
  const {
    children,
    onEdit,
    onDelete,
  } = props;
  return (
    <div className="row">
      <div className="col-9">
        {children}
      </div>
      <div className="col-3 text-right">
        <a href="javascript:void(0);" className="btn btn-secondary mr-2" onClick={onEdit}><i className="fa fa-pencil" /> edit</a>
        <a href="javascript:void(0);" className="btn btn-danger" onClick={onDelete}><i className="fa fa-trash" /> delete</a>
      </div>
    </div>
  );
}

export default class EditableField extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: true, schema: props.schema};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({schema: nextProps.schema});
  }

  handleEdit(event) {
    event.preventDefault();
    
    if (shouldHandleDoubleClick(event.target)) {
      this.setState({edit: true});
    }
  }

  handleUpdate({formData}) {
    // Exclude the "type" key when picking the keys as it is handled by the
    // SWITCH_FIELD action.
    const updated = pickKeys(this.props.schema, formData, ["type"]);
    const schema = {...this.props.schema, ...updated};
    this.setState({edit: false, schema});
    this.props.updateField(this.props.name, schema, formData.required, formData.title);
  }

  handleDelete(event) {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this field?")) {
      this.props.removeField(this.props.name);
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({edit: false});
  }

  handleDrop(data) {
    const {name, swapFields, insertField} = this.props;
    if ("moved-field" in data && data["moved-field"]) {
      if (data["moved-field"] !== name) {
        swapFields(data["moved-field"], name);
      }
    } else if ("field" in data && data.field) {
      insertField(JSON.parse(data.field), name);
    }
  }

  render() {
    const props = this.props;

    if (this.state.edit) {
      return (
        <FieldPropertiesEditor
          {...props}
          onCancel={this.handleCancel.bind(this)}
          onUpdate={this.handleUpdate.bind(this)}
          onDelete={this.handleDelete.bind(this)} />
      );
    }

    if (props.schema.type === "object") {
      if (!props.name) {
        // This can only be the root form object, returning a regular SchemaField.
        return <SchemaField {...props} idSchema={{$id: props.name}} />;
      }
    }

    return (
      <FieldContainer
        onEdit={this.handleEdit.bind(this)}
        onDelete={this.handleDelete.bind(this)}
      >
        <SchemaField {...props}
          schema={this.state.schema}
          idSchema={{$id: props.name}} 
        />
      </FieldContainer>
    );
  }
}
