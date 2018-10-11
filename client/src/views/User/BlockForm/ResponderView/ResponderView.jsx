import React from 'react';

import { Card, CardBody, CardHeader, CardTitle, ListGroup } from 'reactstrap';
import { CollapsibleListItem, PanelHeader, Button } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService, LocalStorageService, HelperService } from 'services';
import { withRouter } from 'react-router-dom';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import queryString from 'querystring';
import LoadingOverlay from 'react-loading-overlay';

const statusMapping = ['Pending', 'Accepted', 'Rejected'];

class ResponderView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      response: {
        values: []
      },
      statusData: {},
      loading:false
    };
  }

  componentWillMount() {

    const contract = userBlockFormsContract(this.props.form.contractAddress);

    contract.methods.checkStatus(
      this.props.match.params.responderAddr,
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
    const response = this.props.form.responses.find((r) => r.responder.toLowerCase() == this.props.match.params.responderAddr.toLowerCase());
    this.setState({ response, isResponder });

  }

  render() {

    const { form, match } = this.props;

    return (

      <React.Fragment>
        <LoadingOverlay
          spinner
          active={this.state.loading}
          text={'Please confirm the transaction to confirm action on application!'}
        >
        <CardHeader>
          <CardTitle>Responses for {this.state.response.responder}</CardTitle>
          <h5>Email: {this.state.response.email}</h5>
          <h5>Form: {form.schema.schema.title}</h5>
          <h5>Description : {form.schema.schema.description}</h5>
          <h5>
            <p>Status: {this.state.statusData['0'] && statusMapping[this.state.statusData['0']]}</p>
            <small>{this.state.statusData['1'] && `Actioned: ${HelperService.formatDate(this.state.statusData['2'])}`}</small>
          </h5>

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
                      responder={match.params.responderAddr}
                      status={this.state.response.status}
                      content={prop}
                      isLast={( this.state.response.values.length - 1 === key )}
                    />
                  );
                })
                :
                'User has not completed form.'
            }

          </ListGroup>
          {
            this.state.isResponder && this.state.response.status === 'PENDING' &&
            <Button
              onClick={() => this.props.history.push(`${this.props.location.pathname}/completeForm`)}>{this.state.response.values.length ? 'Update Response' : 'Add Response'}</Button>
          }
        </CardBody>
        </LoadingOverlay>
      </React.Fragment>
    );
  }
}

export default withRouter(ResponderView);
