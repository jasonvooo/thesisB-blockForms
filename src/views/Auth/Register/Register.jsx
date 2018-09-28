import React from 'react';

import {
  withRouter
} from 'react-router-dom';
import { FormViewer } from 'components';
import { ApiService, LocalStorageService, web3 } from 'services';
import { registrationForm } from 'forms/authForms';
import { Card } from 'reactstrap';
import CryptoJS from 'crypto-js';

class Register extends React.Component {

  constructor(props) {
    super(props);
  }

  async handleSubmit(data) {
    console.log(data);

    const address = await web3.eth.getAccounts();

    // notify.show('Message', 'error');

    // if (data.question_2 !== data.question_3) {
    //   notify.show("1234312", 'error');
    //   return;
    // }

    const payload = {
      address: address[0],
      name: data.question_1,
      password: CryptoJS.SHA256(data.question2).toString()
    };

    try {

      const response = await ApiService.register(payload);
      LocalStorageService.setUserName(response.name);
      this.props.history.push('/builder');
    } catch (err) {
      console.log('Error');
    }
  }

  componentDidMount() {
    const password = document.getElementById('root_question_2');
    password.setAttribute('type', 'password');
    console.log(password);

    const passwordConfirm = document.getElementById('root_question_3');
    passwordConfirm.setAttribute('type', 'password');
    console.log(passwordConfirm);

  }

  render() {

    return (
      <div className="wrapper">
        <div className="auth">
          <Card className="center-form">
            <FormViewer
              form={registrationForm}
              onSubmit={this.handleSubmit}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
