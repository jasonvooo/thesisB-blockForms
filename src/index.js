import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import { LocalStorageService } from 'services';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/now-ui-dashboard.css';
import 'assets/css/demo.css';

import indexRoutes from 'routes/index.jsx';

const hist = createBrowserHistory();
LocalStorageService.loadCurrentUser();

ReactDOM.render(
  <div>
    <Notifications/>
    <Router history={hist}>
      <Switch>
        {
          indexRoutes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                key={key}
                component={prop.component}
              />
            );
          })
        }
      </Switch>
    </Router>
  </div>
  , document.getElementById('root'));
