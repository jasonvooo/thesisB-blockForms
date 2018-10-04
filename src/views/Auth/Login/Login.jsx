import React from 'react';

import { withRouter } from 'react-router-dom';
import { FormViewer } from 'components';
import { LocalStorageService } from 'services';
import { loginForm } from 'forms/authForms';
import { Card } from 'reactstrap';
import { ApiService } from 'services';
import { notify } from 'react-notify-toast';
import CryptoJS from 'crypto-js';


class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginForm
    };
  }

  handleSubmit = async (data) => {
    try {
      const response = await ApiService.login(CryptoJS.SHA256(data.question_1));
      this.props.history.push('/builder');
    } catch (err) {
      notify.show("Invalid Login", 'error');
    }
  };

  componentWillMount() {
    const currentUser = LocalStorageService.getCurrentUser();
    loginForm.schema.description = `Login for ${currentUser}`;
    this.setState({ loginForm });
  }

  componentDidMount() {
    const password = document.getElementById('root_question_1');
    password.setAttribute('type', 'password');
  }

  render() {

    return (
      <div className="wrapper">
        <div className="auth">
          <Card className="center-form">

            <a href="/register">Register</a>

            <FormViewer
              form={this.state.loginForm}
              onSubmit={this.handleSubmit}
            />
          </Card>
        </div>
      </div>
    );
  }

}

export default withRouter(Login);
