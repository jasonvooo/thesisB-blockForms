import React from 'react';

import { Col, Collapse, ListGroupItem, ListGroupItemHeading, Row, Table } from 'reactstrap';
import { Button, FormViewer, ResponseStatus } from 'components';
import { ApiService, HelperService, LocalStorageService, Ipfs } from 'services';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import { withRouter } from 'react-router-dom';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';

class CollapsibleListItem extends React.Component {

  state = {
    isOpen: false,
    isFormOpen: true,
    confirmed: false,
    isResponder: false,
    contractData: {}
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleForm = () => {
    this.setState({ isFormOpen: !this.state.isFormOpen });
  };

  downloadIpfs = async () => {
    const ipfs = await Ipfs.cat(this.props.content.ipfsAddress);
    console.log(ipfs);

    HelperService.download(JSON.parse(ipfs));
  };

  downloadLocalCopy = () => {
    const fileName = `${this.props.form.name}_${LocalStorageService.getCurrentUser()}_${this.props.index}.json`;

    const payload = {
      ...this.props.content,
      formName: this.props.form.name,
      responderAddress: LocalStorageService.getCurrentUser(),
      iteration: this.props.index,
      contractAddress: this.props.form.contractAddress
    };

    HelperService.download(payload, fileName);
  };

  actionResponse = async (action) => {

    const actionValue = action === 'ACCEPTED' ? 1 : 2;

    const contract = userBlockFormsContract(this.props.form.contractAddress);

    contract.methods.actionResponse(
      this.props.match.params.responderAddr,
      this.props.form.name,
      actionValue
    ).send({
      from: LocalStorageService.getCurrentUser()
    }, async (err, response) => {
      if (err) {
        console.log('Error');
      } else {
        await ApiService.actionResponseForm(this.props.form._id, this.props.match.params.responderAddr, action);
        window.location.reload();
      }

    });

  };

  async componentWillMount() {
    const isResponder = LocalStorageService.isResponder();
    // const confirmations = await HelperService.getConfirmations(this.props.content.tx);
    const confirmed = await HelperService.confirmedTransaction(this.props.content.tx);
    this.setState({ confirmed, isResponder });

    const contract = userBlockFormsContract(this.props.form.contractAddress);

    // const user = LocalStorageService.getCurrentUser();
    contract.methods.checkResponse(
      this.props.responder,
      this.props.form.name,
      this.props.index
    ).call({}, (err, response) => {
      if (err) {
        console.error(err);
      } else {
        console.log(response);
        this.setState({ contractData: response });
      }
    });
  }

  render() {
    return (
      <ListGroupItem
        action
        tag="a"
      >
        <ListGroupItemHeading
          onClick={this.toggle}
        >
          {this.state.isOpen ? <FaCaretDown/> : <FaCaretRight/>}
          {`${this.props.index + 1} - ${HelperService.formatDate(this.props.content.timeStamp)}  `}

          {this.state.confirmed ?
            <FaCheckCircle color="green"/> :
            <i className="now-ui-icons loader_refresh spin"/>
          }
          {' '}
          {this.props.isLast && <ResponseStatus status={this.props.status}/>}
        </ListGroupItemHeading>

        <Collapse isOpen={this.state.isOpen}>
          <Row>
            <Col>
              <Table responsive>
                <tbody>
                <tr>
                  <td>
                    TxHash
                  </td>
                  <td>
                    <a href={`https://etherscan.io/tx/${this.props.content.tx}`} target="_blank">
                      {this.props.content.tx}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    Timestamp (From Contract)
                  </td>
                  <td>
                    {HelperService.formatDate(this.state.contractData[0])}
                  </td>
                </tr>
                <tr>
                  <td>
                    Stored Hash (From Contract)
                  </td>
                  <td>
                    {this.state.contractData[1]}
                  </td>
                </tr>
                <tr>
                  <td>
                    Ipfs Address
                  </td>
                  <td>
                    {this.props.content.ipfsAddress}
                  </td>
                </tr>
                </tbody>
              </Table>
              <div>
                <Button onClick={this.downloadLocalCopy}>Download Local Copy</Button>
                <Button onClick={this.downloadIpfs}>Download Response From IPFS</Button>
                {
                  ( !this.state.isResponder && this.props.isLast && this.props.status === 'PENDING' ) &&
                  <React.Fragment>
                    <Button color="success" onClick={() => this.actionResponse('ACCEPTED')}>Accept</Button>
                    <Button color="danger" onClick={() => this.actionResponse('REJECTED')}>Reject</Button>
                  </React.Fragment>
                }
              </div>
            </Col>
            <Col>
              {/*<Button onClick={this.toggleForm}>Show Response</Button>*/}
              <Collapse isOpen={this.state.isFormOpen}>
                <FormViewer
                  form={this.props.form.schema}
                  formData={this.props.content.response}
                  readOnly={true}
                />
              </Collapse>
            </Col>
          </Row>
        </Collapse>
      </ListGroupItem>
    );
  }
}

export default withRouter(CollapsibleListItem);
