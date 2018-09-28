import React from 'react';

import { FormViewer } from 'components';
import { LocalStorageService } from 'services';
import { loginForm } from 'forms/authForms';
import { Card } from 'reactstrap';
import { ApiService } from 'services';

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  async handleSubmit(data) {
    console.log(data);
    try {
      const response = await ApiService.login(data);
    } catch(err) {
      console.log('Error')
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="auth">
          <Card className="center-form">
            <FormViewer
              form={loginForm}
              onSubmit={this.handleSubmit}
            />
          </Card>
        </div>
      </div>
    );
  }

}

export default Login;
