import React from 'react';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FormViewer } from 'components';
import { inviteResponderForm } from 'forms/userForms';
import { userBlockFormsContract } from 'contracts/UserBlockForms';
import { ApiService, LocalStorageService } from 'services';

class InviteFillerModal extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = async (data) => {
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
        await ApiService.addResponderForm(this.props.form._id, responder);
        this.props.toggleModal();
      }

    });
  };

  render() {

    return (
      <div>
        <Modal id="invite-filter-modal" isOpen={this.props.isOpen} toggle={this.props.toggleModal}
               className={this.props.className}>
          <ModalBody>
            <ModalHeader toggle={this.props.toggleModal}/>

            <div className="center-form">
              <FormViewer
                form={inviteResponderForm}
                onSubmit={this.handleSubmit}
              />
            </div>


          </ModalBody>
          {/*<ModalFooter>*/}
          {/*<Button color="primary" onClick={this.props.toggleModal}>Invite</Button>{' '}*/}
          {/*<Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>*/}
          {/*</ModalFooter>*/}
        </Modal>
      </div>
    );
  }
}

export default InviteFillerModal;