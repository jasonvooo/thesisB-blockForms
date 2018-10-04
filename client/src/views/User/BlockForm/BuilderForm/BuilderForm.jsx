import React from 'react';

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Provider } from 'react-redux';
import configureStore from 'components/FormBuilder/store/configureStore';
import { PanelHeader } from 'components';
import FormBuilder_Editor from 'components/FormBuilder/containers/builder/FormContainer';
import { ApiService } from 'services/apiService';

let FormBuilder = {
    Editor: FormBuilder_Editor
};

class BuilderForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);

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

    handleSubmit(form) {
        this.setState({
            form
        });

        // save to localStorage for "viewer" page
        window.localStorage.setItem('foorious:formbuilder:form', JSON.stringify(form));

        ApiService.postForm(form).then(function (response) {
            console.log(response);
        });

    }

    render() {
        return (
            <div>
                <PanelHeader size="sm"/>
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>Form Builder</CardHeader>
                                <CardBody>
                                    <div id="builder" className="map"
                                         style={{ position: 'relative', overflow: 'auto' }}>

                                        <Provider store={this.store}>
                                            <FormBuilder.Editor onSubmit={this.handleSubmit}/>
                                        </Provider>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <code>{JSON.stringify(this.state.form)}</code>

                </div>
            </div>
        );
    }
}

export default BuilderForm;
