import React from 'react';

import { CardBody, CardHeader, CardTitle, ListGroup } from 'reactstrap';
import { CollapsibleListItem, PanelHeader } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import { withRouter } from 'react-router-dom';

class ResponderView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      response: {
        values: []
      }
    };
  }

  componentWillMount() {

    const response = this.props.form.responses.find((r) => r.responder == this.props.match.params.responderAddr);
    this.setState({ response });
  }

  render() {

    const { form } = this.props;

    return (

      <React.Fragment>
        <CardHeader>
          <CardTitle>Responses for {this.state.response.responder}</CardTitle>
          <h5>Email: {this.state.response.email}</h5>
          <h5>Form: {form.schema.schema.title}</h5>
          <h5>Description : {form.schema.schema.description}</h5>
          <h5>Status: {this.state.response.status}</h5>
        </CardHeader>

        <CardBody>
          <h5>Responses</h5>
          <ListGroup>
            {
              this.state.response.values.length ?
              this.state.response.values.map((prop, key) => {
                return (
                  <CollapsibleListItem
                    key={key}
                    index={key}
                    form={form}
                    status={this.state.response.status}
                    content={prop}
                    isLast={(this.state.response.values.length - 1 === key)}
                  />
                );
              })
              :
              'No Responses.'
            }
          </ListGroup>
        </CardBody>
      </React.Fragment>
    );
  }
}

export default withRouter(ResponderView);
