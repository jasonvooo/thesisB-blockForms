import React from 'react';

import { CardBody, ListGroup, ListGroupItem } from 'reactstrap';
import { PanelHeader } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import { withRouter } from 'react-router-dom';

class ResponderView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <React.Fragment>
        <CardBody>

          <ListGroup>
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Morbi leo risus</ListGroupItem>
            <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
          Responder View
        </CardBody>
      </React.Fragment>
    );
  }
}

export default withRouter(ResponderView);
