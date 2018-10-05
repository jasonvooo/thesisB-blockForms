import React from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import { FormViewer, PanelHeader } from 'components';
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
      activeTab: '1'
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
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

    const { schema } = this.state.form;

    return (
      <React.Fragment>
        <CardHeader>
          <CardTitle>{schema.schema.title}</CardTitle>
          {schema.schema.description}
        </CardHeader>
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
                Responses
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
