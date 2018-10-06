import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Footer, Header, Sidebar } from 'components';
import creatorRoutes from 'routes/creator';
import responderRoutes from 'routes/responder';
import { LocalStorageService } from 'services';

var ps;

class Dashboard extends React.Component {

  componentDidMount() {

    if (!LocalStorageService.isLoggedIn()) {
      this.props.history.push(`/login?redirect=${this.props.location.pathname}`);
    }
    // else if (!LocalStorageService.getUserContractAddress()) {
    //   this.props.history.push('/responder/forms');
    // }

    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      this.refs.mainPanel.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }

  render() {

    const routes = this.props.location.pathname.includes('responder') ? responderRoutes : creatorRoutes;

    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={routes}/>
        <div className="main-panel" ref="mainPanel">
          <Header {...this.props}/>
          <Switch>
            {
              routes.map((prop, key) => {
                if (prop.collapse) {
                  return prop.views.map((prop2, key2) => {
                    return (
                      <Route path={prop2.path} component={prop2.component} key={key2}/>
                    );
                  });
                }
                if (prop.redirect)
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key}/>
                  );
                return (
                  <Route path={prop.path} component={prop.component} key={key}/>
                );
              })
            }
          </Switch>
          <Footer fluid/>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
