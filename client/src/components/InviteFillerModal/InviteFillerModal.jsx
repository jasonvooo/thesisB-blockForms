import React from 'react';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FormViewer } from 'components';
import { inviteResponderForm } from 'forms/userForms';
import { userBlockFormsContract } from 'contracts/UserBlockForms';
import { LocalStorageService } from '../../services';

class InviteFillerModal extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = async (data) => {
    console.log(data);
    // Get Contract
    const contract = userBlockFormsContract(LocalStorageService.getUserContractAddress());

    contract.methods.addFormResponder(data.question_1, this.props.formName)
    .send({
      from: LocalStorageService.getCurrentUser()
    }, (err, response) => {

      if (err) {

      } else {
        this.props.toggleModal();
      }
      console.log(response);

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