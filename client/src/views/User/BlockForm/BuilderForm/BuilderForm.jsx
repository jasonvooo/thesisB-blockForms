import React from 'react';

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Provider } from 'react-redux';
import configureStore from 'components/FormBuilder/store/configureStore';
import { PanelHeader } from 'components';
import FormBuilder_Editor from 'components/FormBuilder/containers/builder/FormContainer';
import { ApiService } from 'services';
import LoadingOverlay from 'react-loading-overlay';
import { withRouter } from 'react-router-dom';

let FormBuilder = {
  Editor: FormBuilder_Editor
};

class BuilderForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: null,
      loading: false,
      error: false
    };

    this.store = configureStore({
      notifications: [],
    });

    this.getEncryption();

  }

  async getEncryption() {
    // const address = await web3.eth.getAccounts();
    //
    // const agreeSign = 'You are agreeing to sign to this please confirm your public address is ' + address[0];
    // const encryptionKey = await web3.eth.personal.sign(agreeSign, address[0]);
    //
    // LocalStorageService.setSignedMessage(encryptionKey);
    // console.log(encryptionKey);

    // var receiverpaysContract = new web3.eth.Contract(ReceiverPaysABI.abi);
    // var receiverpays = receiverpaysContract.deploy({
    //   data: ReceiverPaysABI.contractData,
    //   arguments: null
    // }).send({
    //   from: address[0],
    //   gas: '4700000'
    // }).then(function (result) {
    //   console.log(result);
    // })
    // .on('error', function (error) {
    // })
    // .on('transactionHash', function (transactionHash) {
    // })
    // .on('receipt', function (receipt) {
    //   console.log(receipt.contractAddress) // contains the new contract address
    // })
    // .on('confirmation', function (confirmationNumber, receipt) {
    // })
    // .then(function (newContractInstance) {
    //   console.log(newContractInstance.options.address) // instance with the new contract address
    // });
  }

  handleSubmit = async (form) => {
    this.setState({
      form,
      loading: true
    });

    // save to localStorage for "viewer" page
    // window.localStorage.setItem('foorious:formbuilder:form', JSON.stringify(form));

    try {
      const response = await ApiService.postForm(form);
      this.props.history.push(`/creator/forms/${response.id}`);
    } catch (e) {
      console.log('Error');
      // this.setState({ error: true });
    }

  };

  render() {
    return (
      <div>
        <PanelHeader size="sm"/>
        <div className="content">
          <Row>
            <Col xs={12}>
              <LoadingOverlay
                spinner
                active={this.state.loading}
                text={'Saving your form...'}
              >
                <Card className="fill-height">
                  <CardHeader>Form Builder</CardHeader>

                  <CardBody>
                    <div
                      id="builder"
                      className="map fill-height"
                      style={{ position: 'relative', overflow: 'auto' }}
                    >
                      <Provider store={this.store}>
                        <FormBuilder.Editor onSubmit={this.handleSubmit}/>
                      </Provider>
                    </div>
                  </CardBody>
                </Card>
              </LoadingOverlay>
            </Col>
          </Row>

          <code>{JSON.stringify(this.state.form)}</code>

        </div>
      </div>
    );
  }
}

export default withRouter(BuilderForm);
