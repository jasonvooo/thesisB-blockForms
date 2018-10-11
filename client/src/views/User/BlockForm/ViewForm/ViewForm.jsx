import React from 'react';

import { CardBody } from 'reactstrap';
import { Button } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import ResponderView from '../ResponderView/ResponderView';
import DefaultViewForm from './DefaultViewForm';
import CompleteForm from '../CompleteForm/CompleteForm';

class ViewForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: null
    };
  }

  async componentWillMount() {
    const form = await ApiService.getForm(this.props.match.params.formId);
    this.setState({ form });
  }

  render() {

    if (!this.state.form) {
      // TODO STYLE
      return (
        <div className='sweet-loading'>
          <ScaleLoader
            sizeUnit={'px'}
            size={150}
            color={'#123abc'}
            // loading={this.state.loading}
          />
        </div>
      );
    }

    return (
      <React.Fragment>
        <CardBody>
          <Switch>
            <Route
              exact
              path={'/responder/forms/:formId/response/:responderAddr/completeForm'}
              component={() => <CompleteForm form={this.state.form}/>}
            />
            <Route
              exact
              path={'/(responder|creator)/forms/:formId/response/:responderAddr'}
              component={() => <ResponderView form={this.state.form}/>}
            />
            <Route
              path={'/(responder|creator)/forms/:formId'}
              component={() => <DefaultViewForm form={this.state.form}/>}
            />

          </Switch>
        </CardBody>
      </React.Fragment>
    );
  }
}

export default withRouter(ViewForm);
