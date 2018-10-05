import React from 'react';

import { Card, Col, Row } from 'reactstrap';
import { PanelHeader } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import { Route, Switch, withRouter } from 'react-router-dom';
import ViewForm from 'views/User/BlockForm/ViewForm/ViewForm';
import ListForm from 'views/User/BlockForm/ListForm/ListForm';


class WrapperForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <PanelHeader size="sm"/>
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <Switch>
                  <Route
                    exact
                    path={'/forms/:formId'}
                    component={ViewForm}
                  />
                  <Route
                    path={'/forms'}
                    component={ListForm}
                  />
                </Switch>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(WrapperForm);
