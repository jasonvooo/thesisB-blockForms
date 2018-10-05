import React from 'react';

import { Provider } from 'react-redux';
import { Footer, Header, Sidebar } from 'components';
import FormBuilder_UserForm from 'components/FormBuilder/components/UserForm';
import configureStore from 'components/FormBuilder/store/configureStore';
import { ApiService, HelperService, web3 } from 'services';
import $ from 'jquery';

let FormBuilder = {
  Viewer: FormBuilder_UserForm
};

class FormViewer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: this.props.form,
      formData: {}
    };

    this.store = configureStore({
      notifications: [],
    });
  }

  componentDidMount() {

    if (!this.props.onSubmit) {
      $('#block-form-submit').remove();
    }
  }

  render() {


    return (
      <Provider store={this.store}>
        <FormBuilder.Viewer
          schema={this.state.form.schema}
          uiSchema={this.state.form.uiSchema}
          formData={this.state.formData}
          onSubmit={this.props.onSubmit}
        />
      </Provider>
    );
  }

}

export default FormViewer;