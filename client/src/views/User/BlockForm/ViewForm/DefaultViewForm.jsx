import React from 'react';

import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Button, FormViewer, InviteFillerModal, PanelHeader } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import { withRouter } from 'react-router-dom';
import ResponderTable from './ResponderTable';
import classnames from 'classnames';

class DefaultViewForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      modalOpen: false
    };

  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };


  render() {

    const { form } = this.props;

    return (
      <React.Fragment>

        <InviteFillerModal
          isOpen={this.state.modalOpen}
          form={form}
          toggleModal={this.toggleModal}
        />

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => this.toggle('1')}
            >
              Responders
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => this.toggle('2')}
            >
              View Form
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ResponderTable form={form}/>
            <Button onClick={this.toggleModal}>Invite Responder</Button>
          </TabPane>
          <TabPane tabId="2">
            <FormViewer
              form={form.schema}
              readOnly={true}
            />
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

export default withRouter(DefaultViewForm);
