import React from 'react';

import { Card } from 'reactstrap';
import { FormViewer, PanelHeader, SaveResponseModal } from 'components';
import { ApiService, HashingService, LocalStorageService } from 'services';
import { withRouter } from 'react-router-dom';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import LoadingOverlay from 'react-loading-overlay';
import Dropzone from 'react-dropzone';

class ValidateData extends React.Component {

  state = {
    initLoad: false,
  };

  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="complete-form">
            <Card className="center-form">
              <LoadingOverlay
                spinner
                active={this.state.loading}
                text={'Please confirm the transaction to store a hash of your response!'}
              >

              </LoadingOverlay>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ValidateData);
