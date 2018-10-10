import React from 'react';

import { Card } from 'reactstrap';
import { FormViewer, PanelHeader, SaveResponseModal } from 'components';
import { ApiService, HashingService, LocalStorageService, web3 } from 'services';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import LoadingOverlay from 'react-loading-overlay';
import { notify } from 'react-notify-toast';

class CompleteFormUnregistered extends React.Component {

  state = {
    form: { schema: {} },
    initLoad: false,
    loading: false,
    modalOpen: false
  };

  toggleModal = () => {
    this.setState({ modalOpen: false });
    this.props.history.push(`${this.props.location.pathname}/completed`);
  };

  handleSubmit = async (data) => {
    this.setState({ loading: true });

    const hash = HashingService.getHash(data);

    this.setState({ hash });

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

        const form = await ApiService.addResponseForm(this.state.form._id, payload);

        const response = form.responses.find((r) => r.responder === this.state.responder);

        this.setState({ loading: false, modalOpen: true, content: response.values.pop() });
      }
    });
  };

  async componentWillMount() {

    const params = queryString.parse(this.props.location.search);

    // TODO check sender param and check if is the current one
    if (!params.sender) {
      notify.show("Invalid Credentials", 'error');
      this.props.history.push('/login');
    }

    this.setState({ responder: params.sender });


    const form = await ApiService.getForm(this.props.match.params.formId);
    this.setState({ form, initLoad: true });
  }

  render() {
    return (
      <React.Fragment>
        <SaveResponseModal
          isOpen={this.state.modalOpen}
          hash={this.state.hash}
          data={this.state.content}
          formName={this.state.form.name}
          responder={this.state.responder}
          toggleModal={this.toggleModal}
        />

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
      </React.Fragment>
    );
  }
}

export default withRouter(CompleteFormUnregistered);
