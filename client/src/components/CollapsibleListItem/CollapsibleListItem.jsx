import React from 'react';

import { Col, Collapse, ListGroupItem, ListGroupItemHeading, Row, Table } from 'reactstrap';
import moment from 'moment';
import { Button, FormViewer, ResponseStatus } from 'components';
import { ApiService, HelperService, LocalStorageService } from 'services';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import { withRouter } from 'react-router-dom';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';

class CollapsibleListItem extends React.Component {

  state = {
    isOpen: false,
    isFormOpen: true,
    confirmed: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleForm = () => {
    this.setState({ isFormOpen: !this.state.isFormOpen });
  };

  downloadLocalCopy = () => {
    HelperService.download(JSON.stringify(this.props.content), 0, 4);
  };

  actionResponse = async (action) => {
    await ApiService.actionResponseForm(this.props.form._id, this.props.match.params.responderAddr, action);
  };

  async componentWillMount() {
    const confirmations = await HelperService.getConfirmations(this.props.content.tx);
    console.log(confirmations);
    const confirmed = await HelperService.confirmedTransaction(this.props.content.tx);
    this.setState({ confirmed });

    // TODO READ FROM CONTRACT

    const contract = userBlockFormsContract(this.props.form.contractAddress);

    contract.methods.checkResponse(
      LocalStorageService.getCurrentUser(),
      this.props.form.name,
      this.props.index
    ).call({}, (err, response) => {
      if (err) {
        console.error(err);
      } else {
        console.log(response);
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
          { this.state.isOpen ? <FaCaretDown /> : <FaCaretRight /> }
          {`${this.props.index + 1} - ${moment(this.props.timeStamp).format('llll')}  `}

          {this.state.confirmed ?
            <FaCheckCircle color="green"/> :
            <i className="now-ui-icons loader_refresh spin"/>
          }
          {' '}
          {this.props.isLast && <ResponseStatus status={this.props.status}/>}
        </ListGroupItemHeading>

        <Collapse isOpen={this.state.isOpen}>
          <Row>
            <Col sm="6">
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
                </tbody>
              </Table>
              <div>
                <Button onClick={this.downloadLocalCopy}>Download Local Copy</Button>
                {
                  (this.props.isLast && this.props.status === 'PENDING') &&
                  <React.Fragment>
                    <Button color="success" onClick={() => this.actionResponse('ACCEPTED')}>Accept</Button>
                    <Button color="danger" onClick={() => this.actionResponse('REJECTED')}>Reject</Button>
                  </React.Fragment>
                }
              </div>
            </Col>
            <Col sm="6">
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
