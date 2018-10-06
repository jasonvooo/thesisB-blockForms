import React from 'react';

import { Collapse, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

class CollapsibleListItem extends React.Component {

  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <ListGroupItem
        action
        tag="button"
        onClick={this.toggle}
      >
        <ListGroupItemHeading>{this.props.content.tx}</ListGroupItemHeading>

        <Collapse isOpen={this.state.isOpen}>
          <ListGroupItemText>
            {JSON.stringify(this.props.content)}
          </ListGroupItemText>
        </Collapse>
      </ListGroupItem>
    );
  }
}

export default CollapsibleListItem;
