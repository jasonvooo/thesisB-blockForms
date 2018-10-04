import React from 'react';

import { Redirect, withRouter } from 'react-router-dom';
import { FormViewer } from 'components';
import { ApiService, LocalStorageService } from 'services';
import { loginForm } from 'forms/authForms';

class Logout extends React.Component {
  render() {

    LocalStorageService.clear();

    return (
      <Redirect to={'/login'} />
    );
  }
}

export default withRouter(Logout);
