import React from 'react';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FormViewer } from 'components';
import { inviteResponderForm } from 'forms/userForms';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import { ApiService, LocalStorageService } from 'services';
import LoadingOverlay from 'react-loading-overlay';

class InviteFillerModal extends React.Component {

  state = {
    loading: false
  };

  handleSubmit = async (data) => {
    this.setState({ loading: true });
    console.log(data);
    // Get Contract
    const contract = userBlockFormsContract(LocalStorageService.getUserContractAddress());

    const responder = {
      address: data.question_1,
      email: data.question_2
    };

    contract.methods.addFormResponder(responder.address, this.props.form.name)
    .send({
      from: LocalStorageService.getCurrentUser()
    }, async (err, response) => {
      if (err) {
        console.log('Error');
      } else {
        // TODO need to update top level component with new form
        await ApiService.addResponderForm(this.props.form._id, responder);
        this.props.toggleModal();
        window.location.reload();
      }

    });
  };

  render() {

    return (
      <React.Fragment>
        <Modal
          id="invite-filter-modal"
          isOpen={this.props.isOpen}
          toggle={this.props.toggleModal}
          className={this.props.className}
        >
          <LoadingOverlay
            spinner
            active={this.state.loading}
            text={'Inviting User...'}
          >
            <ModalHeader className="no-padding" toggle={this.props.toggleModal}>
              Invite to {this.props.form.name}
            </ModalHeader>
            <ModalBody>
              <div className="center-form">
                <FormViewer
                  form={inviteResponderForm}
                  onSubmit={this.handleSubmit}
                />
              </div>
            </ModalBody>
          </LoadingOverlay>

        </Modal>
      </React.Fragment>
    );
  }
}

export default InviteFillerModal;