import React from 'react';

import { Card, CardHeader, Col, Row, CardBody } from 'reactstrap';
import { AuthNavigation, FormViewer, PanelHeader, SaveResponseModal } from 'components';
import { ApiService, HashingService, LocalStorageService } from 'services';
import { withRouter } from 'react-router-dom';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import ValidateComponent from './ValidateComponent';

import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

class ValidateWrapper extends React.Component {

  render() {

    return (
      <div>
        <PanelHeader size="sm"/>
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                </CardHeader>
                <CardBody>
                  <ValidateComponent/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(ValidateWrapper);
