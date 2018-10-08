import React from 'react';

import { CardBody } from 'reactstrap';
import { Button, FormViewer, InviteFillerModal, PanelHeader } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import ResponderView from '../ResponderView/ResponderView';
import DefaultViewForm from './DefaultViewForm';

class ViewForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: null,
      modalOpen: false
    };
  }


  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

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

        <InviteFillerModal
          isOpen={this.state.modalOpen}
          form={this.state.form}
          toggleModal={this.toggleModal}
        />
        <CardBody>
          <Switch>
            <Route
              exact
              path={'/(responder|creator)/forms/:formId/response/:responderAddr'}
              component={() => <ResponderView form={this.state.form}/>}
            />
            <Route
              path={'/(responder|creator)/forms/:formId'}
              component={() => <DefaultViewForm form={this.state.form} />}
            />

          </Switch>
        </CardBody>
      </React.Fragment>
    );
  }
}

export default withRouter(ViewForm);
