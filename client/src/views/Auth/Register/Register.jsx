import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import { FormViewer } from 'components';
import { ApiService, LocalStorageService, web3 } from 'services';
import { registrationForm } from 'forms/authForms';
import { Card, Progress } from 'reactstrap';
import CryptoJS from 'crypto-js';
import { notify } from 'react-notify-toast';
import { userBlockFormsAbi, userBlockFormsByteCode } from 'contracts/UserBlockForms';
import $ from 'jquery';

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      registrationForm,
      loading: false,
      percentage: 0
    };
  }

  handleSubmit = async (data) => {

    if (data.question_2 !== data.question_3) {
      notify.show('Passwords don\'t match', 'error');
      return;
    }

    this.setState({ loading: true, percentage: 25 });

    try {

      var formCreatorContractContract = new web3.eth.Contract(userBlockFormsAbi);
      var formCreatorContractResponse = await formCreatorContractContract.deploy({
        data: userBlockFormsByteCode
      }).send({
        from: LocalStorageService.getCurrentUser(),
        gas: '4700000'
      });

      this.setState({ percentage: 50 });

      console.log(formCreatorContractResponse);

      const payload = {
        address: await LocalStorageService.getCurrentUser(),
        name: data.question_1,
        password: CryptoJS.SHA256(data.question_2).toString(),
        contractAddress: formCreatorContractResponse._address
      };

      this.setState({ percentage: 75 });
      const response = await ApiService.register(payload);
      this.setState({ percentage: 100 });

      LocalStorageService.setCurrentUserData(response);
      this.props.history.push('/builder');

    } catch (err) {
      this.setState({ loading: false });
      notify.show('Unable to Register User', 'error');
    }
  };

  componentWillMount() {
    const currentUser = LocalStorageService.getCurrentUser();
    registrationForm.schema.title = `Registration for ${currentUser}`;
    this.setState({ registrationForm });
  }

  componentDidMount() {
    $('#root_question_2').attr('type', 'password');
    $('#root_question_3').attr('type', 'password');
  }

  render() {

    return (
      <div className="wrapper">
        <div className="auth">
          <Card className="center-form">

            {
              this.state.loading ?
                <Progress striped value={this.state.percentage}/> :
                <React.Fragment>
                  <Link to="/login">
                    Login
                  </Link>

                  <FormViewer
                    form={this.state.registrationForm}
                    onSubmit={this.handleSubmit}
                  />
                </React.Fragment>
            }
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
