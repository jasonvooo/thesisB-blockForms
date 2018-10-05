import React from 'react';

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { FormViewer, PanelHeader } from 'components';
import CryptoJS from 'crypto-js';
import storeHash from 'contracts/storeHash';
import { ApiService, HelperService, web3 } from 'services';

class CompleteForm extends React.Component {

  constructor(props) {
    super(props);

    let form = window.localStorage.getItem('foorious:formbuilder:form') ? JSON.parse(window.localStorage.getItem('foorious:formbuilder:form')) : null;

    this.state = {
      form: form,
      formData: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    // ApiService.getForms().then((form) => {
    //   this.setState({ form: form[0].schema });
    // });
  }

  handleSubmit = async (data) => {
    this.setState({
      formData: data
    });

    console.log(JSON.stringify(data));

    HelperService.download(JSON.stringify(data, 0, 4));

    // TODO possibly add nonce to data
    // TODO set up password link
    const hash = CryptoJS.HmacSHA256(JSON.stringify(data), '123').toString();
    console.log('HmacSHA256', hash);

    const hashClean = CryptoJS.SHA256(JSON.stringify(data)).toString();
    console.log('SHA256', hashClean);

    const hash512 = CryptoJS.SHA512(JSON.stringify(data)).toString();
    console.log('SHA512', hash512);

    const accounts = await web3.eth.getAccounts();

    // HOW TO SET VALUE IN HASH
    storeHash.methods.sendHash(hash).send({
      from: accounts[0]
    }, (error, transactionHash) => {
      console.log(transactionHash);

      storeHash.methods.getHash().call({}, (error, transactionHash) => {
        console.log(transactionHash);

        if (transactionHash === hash) {
          console.log('SAME');
        } else {
          console.log('NOTSAME');
        }
      });

    });

    // HOW TO READY VALUE

  }

  render() {
    return (
      <div>
        <PanelHeader size="sm"/>
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>Form Complete</CardHeader>
                <CardBody>
                  <div id="completeForm" className="map"
                       style={{ position: 'relative', overflow: 'hidden' }}>

                    {
                      this.state.form ? (
                        <FormViewer
                          form={this.state.form}
                          onSubmit={this.handleSubmit}
                        />
                      ) : (
                        <h4 className="text-danger mt-3"><i
                          className="fa fa-exclamation-triangle"/> create form first.</h4>
                      )
                    }
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <code>{JSON.stringify(this.state.formData)}</code>
        </div>
      </div>
    );
  }
}

export default CompleteForm;
