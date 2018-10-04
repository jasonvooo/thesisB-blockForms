import React from 'react';

import { withRouter } from 'react-router-dom';
import { FormViewer } from 'components';
import { ApiService, LocalStorageService, web3 } from 'services';
import { registrationForm } from 'forms/authForms';
import { Card } from 'reactstrap';
import CryptoJS from 'crypto-js';
import { notify } from 'react-notify-toast';


class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      registrationForm
    }
  }

  handleSubmit = async (data) => {

    if (data.question_2 !== data.question_3) {
      notify.show('Passwords don\'t match', 'error');
      return;
    }

    const payload = {
      address: await LocalStorageService.getCurrentUser(),
      name: data.question_1,
      password: CryptoJS.SHA256(data.question2).toString()
    };

    try {
      const response = await ApiService.register(payload);
      LocalStorageService.setUserName(response.name);
      this.props.history.push('/builder');
    } catch (err) {
      notify.show('Unable to Register User', 'error');
    }
  };

  componentWillMount() {
    const currentUser = LocalStorageService.getCurrentUser();
    registrationForm.schema.title = `Registration for ${currentUser}`;
    this.setState({ registrationForm });
  }

  componentDidMount() {
    const password = document.getElementById('root_question_2');
    password.setAttribute('type', 'password');

    const passwordConfirm = document.getElementById('root_question_3');
    passwordConfirm.setAttribute('type', 'password');
  }

  render() {

    return (
      <div className="wrapper">
        <div className="auth">
          <Card className="center-form">

            <a href="/login">Login</a>

            <FormViewer
              form={this.state.registrationForm}
              onSubmit={this.handleSubmit}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
