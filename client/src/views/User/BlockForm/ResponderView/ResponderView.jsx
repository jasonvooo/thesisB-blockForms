import React from 'react';

import { CardBody, CardHeader, CardTitle, ListGroup } from 'reactstrap';
import { CollapsibleListItem, PanelHeader, Button } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService, LocalStorageService } from 'services';
import { withRouter } from 'react-router-dom';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';

const statusMapping = ['Pending', 'Accepted', 'Rejected'];

class ResponderView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      response: {
        values: []
      },
      statusData: {}
    };
  }

  componentWillMount() {

    const contract = userBlockFormsContract(this.props.form.contractAddress);

    const user = LocalStorageService.getCurrentUser();
    contract.methods.checkStatus(
      user,
      this.props.form.name
    ).call({}, (err, statusData) => {
      if (err) {
        console.error(err);
      } else {
        console.log(statusData);
        this.setState({ statusData });
      }
    });

    const isResponder = LocalStorageService.isResponder();
    const response = this.props.form.responses.find((r) => r.responder === this.props.match.params.responderAddr);
    this.setState({ response, isResponder });

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
          <h5>Status: {statusMapping[this.state.statusData['0']]}</h5>
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
                      isLast={( this.state.response.values.length - 1 === key )}
                    />
                  );
                })
                :
                <React.Fragment>
                  {this.state.isResponder ?
                    <Button onClick={() => this.props.history.push(`${this.props.location.pathname}/completeForm`)}>Complete form</Button> :
                    'User has not completed form.'
                  }
                </React.Fragment>
            }
          </ListGroup>
        </CardBody>
      </React.Fragment>
    );
  }
}

export default withRouter(ResponderView);
