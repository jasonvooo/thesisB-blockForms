import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import { AuthNavigation, FormViewer } from 'components';
import { ApiService, LocalStorageService } from 'services';
import { loginForm } from 'forms/authForms';
import { Card } from 'reactstrap';
import { notify } from 'react-notify-toast';
import CryptoJS from 'crypto-js';
import $ from 'jquery';
import queryString from 'query-string';

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

      const params = queryString.parse(this.props.location.search);
      if (params.redirect) {
        this.props.history.push(params.redirect);
      } else {

        if (response.contractAddress) {
          this.props.history.push('/creator/forms');
        } else {
          this.props.history.push('/responder/forms');
        }

      }

    } catch (err) {
      notify.show('Invalid Login', 'error');
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
        <AuthNavigation/>
        <div className="auth">
          <Card className="center-form">

            {/*<Link to="/registerCreator">*/}
              {/*Register*/}
            {/*</Link>*/}

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
