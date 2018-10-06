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

    console.log(response);
    this.setState({ response });
  }

  render() {

    const { form } = this.props;

    return (

      <React.Fragment>
        <CardHeader>
          <CardTitle>{form.schema.schema.title}</CardTitle>
          {form.schema.schema.description}
        </CardHeader>

        <CardBody>
          Responses
          <ListGroup>
            {
              this.state.response.values.map((prop, key) => {
                return (
                  <CollapsibleListItem
                    key={key}
                    content={prop}
                  />
                  // <ListGroupItem key={key}>{prop.tx}</ListGroupItem>
                );
              })
            }
          </ListGroup>
        </CardBody>
      </React.Fragment>
    );
  }
}

export default withRouter(ResponderView);
