import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import { FormViewer } from 'components';
import { ApiService, LocalStorageService } from 'services';
import { loginForm } from 'forms/authForms';
import { Card } from 'reactstrap';
import { notify } from 'react-notify-toast';
import CryptoJS from 'crypto-js';
import $ from 'jquery';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginForm
    };
  }

  handleSubmit = async (data) => {
    try {
      const response = await ApiService.login(CryptoJS.SHA256(data.question_1).toString());
      this.props.history.push('/forms');
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
    $('#root_question_1').attr('type', 'password');
  }

  render() {

    return (
      <div className="wrapper">
        <div className="auth">
          <Card className="center-form">

            <Link to="/register">
              Register
            </Link>

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