import React from 'react';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Button } from 'components';
import { HelperService, LocalStorageService } from 'services';
import LoadingOverlay from 'react-loading-overlay';
import { withRouter, Link } from 'react-router-dom';

class SaveResponseModal extends React.Component {

  state = {
    loading: false
  };

  downloadData = () => {

    const { formName, responder, index = 0, contractAddress } = this.props;

    // TODO see if we can fix the variable names
    const fileName = `${formName}_${responder}_${index}.json`;
    const payload = {
      ...this.props.data,
      formName,
      responderAddress: responder,
      iteration: index,
      contractAddress
    };

    HelperService.download(payload, fileName);
  };

  render() {

    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggleModal}
        >
          <LoadingOverlay
            spinner
            active={this.state.loading}
            text={'Inviting User...'}
          >
            <ModalHeader>
              Notice! Please save the data below.
            </ModalHeader>
            <ModalBody>
              <p>Your response has been successfully recorded and hashed onto the blockchain. We strongly recommend that
                you save the data locally. Your data can be validated within the <Link to="/validate" target="_blank">Validate</Link> page of the website</p>


              <Button onClick={this.downloadData}>Download</Button>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.props.toggleModal}>Close</Button>
            </ModalFooter>
          </LoadingOverlay>

        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(SaveResponseModal);