import React from 'react';

import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap';
import { PanelHeader } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

const headers = [
  'Name', 'Description', 'No. Responses', 'Date Created'
];

class RegularTables extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      forms: []
    };
  }

  async componentWillMount() {
    const forms = await ApiService.getForms();
    console.log(forms);
    this.setState({ forms });
  }

  render() {
    return (
      <div>
        <PanelHeader size="sm"/>
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle>Forms</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead className="text-primary">
                    <tr>
                      {
                        headers.map((prop, key) => {
                          if (key === thead.length - 1)
                            return (
                              <th key={key} className="text-right">{prop}</th>
                            );
                          return (
                            <th key={key}>{prop}</th>
                          );
                        })
                      }
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.forms.map((prop, key) => {

                        return (
                          <tr key={key} onClick={null}>
                            <td key="Name">{prop.schema.schema.title}</td>
                            <td key="Description">{prop.schema.schema.description}</td>
                            <td key="responses">{prop.responses.length}</td>
                            <td
                              key="creationTime"
                              className="text-right">{moment(prop.creationTime).format('llll')}
                            </td>
                          </tr>
                        );

                      })
                    }
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(RegularTables);
