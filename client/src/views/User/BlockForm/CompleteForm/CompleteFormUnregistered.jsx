import React from 'react';

import { Card } from 'reactstrap';
import { FormViewer, PanelHeader } from 'components';
import CryptoJS from 'crypto-js';
import { ApiService, LocalStorageService, web3, HashingService } from 'services';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import LoadingOverlay from 'react-loading-overlay';

class CompleteFormUnregistered extends React.Component {

  state = {
    form: { schema: {} },
    initLoad: false,
    loading: false,
    saved: false
  };

  handleSubmit = async (data) => {
    this.setState({ loading: true });

    console.log(JSON.stringify(data));

    // HelperService.download(JSON.stringify(data, 0, 4));

    const hash = HashingService.getHash(data);

    const contract = userBlockFormsContract(this.state.form.contractAddress);

    contract.methods.addFormResponse(this.state.form.name, hash)
    .send({
      from: LocalStorageService.getCurrentUser()
    }, async (err, response) => {

      if (err) {
        console.log('Error');
      } else {

        const payload = {
          response: data,
          hash: hash,
          tx: response
        };

        await ApiService.addResponseForm(this.state.form._id, payload);
        this.setState({ loading: false, saved: true });
        this.props.history.push(`${this.props.location.pathname}/completed`);
      }
    });
  };

  async componentWillMount() {

    const params = queryString.parse(this.props.location.search);
    // TODO check sender param and check if is the current one
    // if (!params.sender || params.sender)

    const form = await ApiService.getForm(this.props.match.params.formId);
    this.setState({ form, initLoad: true });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="complete-form">
          <Card className="center-form">
            <LoadingOverlay
              spinner
              active={this.state.loading}
              text={'Please confirm the transaction to store a hash of your response!'}
            >
              {
                this.state.initLoad &&
                <FormViewer
                  // maxHeight={true}
                  form={this.state.form.schema}
                  onSubmit={this.handleSubmit}
                />
              }
            </LoadingOverlay>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(CompleteFormUnregistered);
