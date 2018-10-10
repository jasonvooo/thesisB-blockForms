import React from 'react';

import { CardBody, CardHeader } from 'reactstrap';
import { FormViewer, PanelHeader } from 'components';
import { ApiService, HashingService, LocalStorageService, Ipfs } from 'services';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import LoadingOverlay from 'react-loading-overlay';

class CompleteForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: null,
      formData: {},
      loading: false
    };

  }

  handleSubmit = async (data) => {
    this.setState({ loading: true });
    console.log(JSON.stringify(data));

    // TODO possibly add nonce to data
    // TODO set up password link
    const hash = HashingService.getHash(data);

    const contract = userBlockFormsContract(this.state.form.contractAddress);

    contract.methods.addFormResponse(this.state.form.name, hash)
    .send({
      from: LocalStorageService.getCurrentUser()
    }, async (err, response) => {

      if (err) {
        console.log('Error');
      } else {

        const ipfsAddress = await Ipfs.add(JSON.stringify(data));

        const payload = {
          ipfsAddress,
          response: data,
          hash: hash,
          tx: response
        };

        await ApiService.addResponseForm(this.state.form._id, payload);
        this.props.history.goBack();
      }
    });

    // const accounts = await web3.eth.getAccounts();
    //
    // // HOW TO SET VALUE IN HASH
    // storeHash.methods.sendHash(hash).send({
    //   from: accounts[0]
    // }, (error, transactionHash) => {
    //   console.log(transactionHash);
    //
    //   storeHash.methods.getHash().call({}, (error, transactionHash) => {
    //     console.log(transactionHash);
    //
    //     if (transactionHash === hash) {
    //       console.log('SAME');
    //     } else {
    //       console.log('NOTSAME');
    //     }
    //   });
    //
    // });

    // HOW TO READY VALUE

  };

  async componentWillMount() {

    const response = this.props.form.responses.find((r) => r.responder === this.props.match.params.responderAddr);

    let formData= null;
    if (response.values.length) {
      formData = response.values[response.values.length-1].response;
    }

    this.setState({ form: this.props.form, formData });
  }

  render() {

    return (
      <React.Fragment>
        <CardHeader>Form Complete</CardHeader>
        <CardBody>
          <div
            className="map fill-height"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <LoadingOverlay
              spinner
              active={this.state.loading}
              text={'Please confirm the transaction to store a hash of your response!'}
            >

              {
                this.state.form ? (
                  <FormViewer
                    maxHeight={true}
                    form={this.state.form.schema}
                    formData={this.state.formData}
                    onSubmit={this.handleSubmit}
                  />
                ) : (
                  <h4 className="text-danger mt-3"><i
                    className="fa fa-exclamation-triangle"/> create form first.</h4>
                )
              }
            </LoadingOverlay>
          </div>
        </CardBody>
        <code>{JSON.stringify(this.state.formData)}</code>
      </React.Fragment>
    );
  }
}

export default withRouter(CompleteForm);
