import React from 'react';

import { Card } from 'reactstrap';
import { FormViewer, PanelHeader } from 'components';
import CryptoJS from 'crypto-js';
import { ApiService, HelperService, LocalStorageService, web3 } from 'services';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import LoadingOverlay from 'react-loading-overlay';

class CompleteFormUnregistered extends React.Component {

  state = {
    form: {
      schema: {}
    },
    initLoad: false,
    loading: false,
    saved: false
  };

  handleSubmit = async (data) => {
    this.setState({
      formData: data,
      loading: true
    });

    console.log(JSON.stringify(data));

    // HelperService.download(JSON.stringify(data, 0, 4));

    // TODO possibly add nonce to data
    // TODO set up password link
    const hash = CryptoJS.HmacSHA256(JSON.stringify(data), '123').toString();
    console.log('HmacSHA256', hash);

    const hashClean = CryptoJS.SHA256(JSON.stringify(data)).toString();
    console.log('SHA256', hashClean);

    const hash512 = CryptoJS.SHA512(JSON.stringify(data)).toString();
    console.log('SHA512', hash512);

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
          tx: response
        };

        await ApiService.addResponseForm(this.state.form._id, payload);
        this.setState({ loading: false, saved: true });
        this.props.history.push(`${this.props.location.pathName}/completed`)
      }
    });
  };

  async componentWillMount() {

    console.log(this.props.location);
    const params = queryString.parse(this.props.location.search);
    console.log(params);

    console.log(this.props.match.params.formId);

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
