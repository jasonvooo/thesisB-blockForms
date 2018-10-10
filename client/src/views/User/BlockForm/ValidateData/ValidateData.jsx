import React from 'react';

import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { AuthNavigation, FormViewer, PanelHeader, SaveResponseModal } from 'components';
import { ApiService, HashingService, LocalStorageService } from 'services';
import { withRouter } from 'react-router-dom';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import LoadingOverlay from 'react-loading-overlay';
import DropzoneComponent from 'react-dropzone-component';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';

import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

class ValidateData extends React.Component {

  state = {
    loading: false,
    jsonData: {},
    contractData: {},
    calculatedHash: false
  };

  callContract = (data) => {
    const contract = userBlockFormsContract(data.contractAddress);

    const calculatedHash = HashingService.getHash(data.response, data.responderAddress);

    this.setState({ calculatedHash });

    contract.methods.checkResponse(
      data.responderAddress,
      data.formName,
      data.iteration
    ).call({}, async (err, response) => {
      if (err) {
        console.log('Error');
      } else {
        console.log(response);

        this.setState({ contractData: response });
      }

    });
  };

  onFileAdd = (file) => {

    this.setState({ fileName: file.name });
    const reader = new window.FileReader();
    reader.onloadend = (e) => {
      const buffer = Buffer.from(e.target.result);
      const jsonData = JSON.parse(buffer.toString());
      // console.log(JSON.parse(buffer.toString()));
      this.setState({ jsonData });
      this.callContract(jsonData);
    };
    reader.onerror = function (e) {
      console.log(e.target.error);
    };
    reader.readAsArrayBuffer(file);
  };

  render() {

    const componentConfig = {
      iconFiletypes: ['.json'],
      showFiletypeIcon: true,
      postUrl: 'no-url'
    };

    const djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: 'application/json',
      autoProcessQueue: false
    };

    const eventHandlers = {
      addedfile: this.onFileAdd
    };

    const sameHash = this.state.calculatedHash === this.state.contractData[1];

    return (
      <React.Fragment>
        <div className="wrapper">
          <AuthNavigation/>
          <div className="complete-form">
            <Card className="center-form">
              <CardHeader>
                Welcome to Block Forms. This page will allow you validate the data which you have completed in a form.
              </CardHeader>
              <CardBody>
                <LoadingOverlay
                  spinner
                  active={this.state.loading}
                  text={'Please confirm the transaction to store a hash of your response!'}
                >
                  <DropzoneComponent
                    config={componentConfig}
                    djsConfig={djsConfig}
                    eventHandlers={eventHandlers}
                  />
                  <br/>
                  <br/>

                  <Row>
                    <Col>
                      File Data
                      <Table responsive>
                        <tbody>
                        <tr>
                          <td>
                            Form Name
                          </td>
                          <td>
                            {this.state.jsonData.formName}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Responder Address
                          </td>
                          <td>
                            {this.state.jsonData.responderAddress}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            TxHash
                          </td>
                          <td>
                            <a href={`https://etherscan.io/tx/${this.state.jsonData.tx}`} target="_blank">
                              {this.state.jsonData.tx}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Response
                          </td>
                          <td>
                          <pre>
                            {JSON.stringify(this.state.jsonData.response, 0, 4)}
                          </pre>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Calculated Hash
                          </td>
                          <td>
                            {this.state.calculatedHash}
                            {sameHash ?
                              <FaCheckCircle color="green"/> :
                              <FaTimesCircle color="red"/>
                            }
                          </td>
                        </tr>
                        </tbody>
                      </Table>


                    </Col>
                    <Col>
                      Data from Ethereum Blockchain
                      <Table responsive>
                        <tbody>
                        <tr>
                          <td>
                            Time Stamp
                          </td>
                          <td>
                            {/*{this.state.contractData && moment(new Date(this.state.contractData[0])).format('llll')}*/}
                            {this.state.contractData[0]}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Stored Hash
                          </td>
                          <td>
                            {this.state.contractData[1]}
                            {sameHash ?
                              <FaCheckCircle color="green"/> :
                              <FaTimesCircle color="red"/>
                            }
                          </td>
                        </tr>
                        </tbody>
                      </Table>

                    </Col>
                  </Row>

                </LoadingOverlay>
              </CardBody>

            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ValidateData);
