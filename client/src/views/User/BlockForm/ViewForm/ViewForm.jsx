import React from 'react';

import { CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { Button, FormViewer, InviteFillerModal, PanelHeader } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import { withRouter } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import classnames from 'classnames';

class ViewForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: null,
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

  async componentWillMount() {
    const form = await ApiService.getForm(this.props.match.params.formId);
    this.setState({ form });
  }

  render() {

    if (!this.state.form) {
      // TODO STYLE
      return (
        <div className='sweet-loading'>
          <ScaleLoader
            sizeUnit={'px'}
            size={150}
            color={'#123abc'}
            // loading={this.state.loading}
          />
        </div>
      );
    }

    const { schema, name } = this.state.form;

    return (
      <React.Fragment>

        <InviteFillerModal
          isOpen={this.state.modalOpen}
          formName={name}
          toggleModal={this.toggleModal}
        />

        {/*<CardHeader>*/}
        {/*<CardTitle>{schema.schema.title}</CardTitle>*/}
        {/*{schema.schema.description}*/}
        {/*</CardHeader>*/}
        <CardBody>

          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => this.toggle('1')}
              >
                View Form
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => this.toggle('2')}
              >
                Responders
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <FormViewer
                    form={schema}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Button onClick={this.toggleModal}>Add Responder</Button>

                {/*<Col sm="6">*/}
                {/*<Card body>*/}
                {/*<CardTitle>Special Title Treatment</CardTitle>*/}
                {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
                {/*<Button>Go somewhere</Button>*/}
                {/*</Card>*/}
                {/*</Col>*/}
                {/*<Col sm="6">*/}
                {/*<Card body>*/}
                {/*<CardTitle>Special Title Treatment</CardTitle>*/}
                {/*<CardText>With supporting text below as a natural lead-in to additional content.</CardText>*/}
                {/*<Button>Go somewhere</Button>*/}
                {/*</Card>*/}
                {/*</Col>*/}
              </Row>
            </TabPane>
          </TabContent>

        </CardBody>
      </React.Fragment>
    );
  }
}

export default withRouter(ViewForm);
