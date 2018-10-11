import React from 'react';

import { Card, CardHeader } from 'reactstrap';
import { AuthNavigation, FormViewer, PanelHeader, SaveResponseModal } from 'components';
import { ApiService, HashingService, LocalStorageService } from 'services';
import { withRouter } from 'react-router-dom';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import ValidateComponent from './ValidateComponent';

import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

class ValidateData extends React.Component {

  render() {


    return (
      <React.Fragment>
        <div className="wrapper">
          <AuthNavigation/>
          <div className="complete-form">
            <Card className="center-form">
              <CardHeader>
                Welcome to Block Forms. This page will allow you validate the data which you have completed in a form.
              </CardHeader>
              <ValidateComponent/>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ValidateData);
