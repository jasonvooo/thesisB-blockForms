import React, { Component } from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import config from '../../config';

export default class FieldListDropdown extends Component {
  constructor(props) {
    super(props);

    let fieldListAction = 'add_field';
    if (typeof(this.props.name) !== 'undefined') {
      // By default FieldListDropdown adds a new field, but in this case
      // we want to switch from a field to a other one (ex: "input" to
      // "checkbox").
      fieldListAction = 'switch_field';
    }
    this.state = {
      open: false,

      fieldList: config.fieldList,
      fieldListAction: fieldListAction
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(i, e) {
    const fieldList = this.state.fieldList;
    i = parseInt(i, 10);

    if (typeof fieldList[i] !== 'undefined') {
      const field = fieldList[i];

      if (this.state.fieldListAction === 'switch_field') {
        this.props.switchField(this.props.name, field);
      } else {
        this.props.addField(field);
      }

    }
  }

  render() {
    return (
      <UncontrolledDropdown direction="down" id="split-button-dropup" className={this.props.className}>
        <DropdownToggle>
          {this.props.children}
        </DropdownToggle>

        <DropdownMenu>
          {this.state.fieldList.map((field, i) => {
            return (
              <DropdownItem
                key={i}
                // eventKey={i}
                onClick={() => this.handleSelect(i)}
              >
                <i className={field.icon}/>
                {field.label}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

// FieldListDropdown.defaultProps = {
//   bsStyle: 'default'
// };
