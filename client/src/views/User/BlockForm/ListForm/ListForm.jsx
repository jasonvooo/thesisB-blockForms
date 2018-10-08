import React from 'react';

import { CardBody, CardHeader, CardTitle, Table } from 'reactstrap';
import { PanelHeader } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

const headers = [
  'Name', 'Description', 'No. Responders', 'Date Created'
];

class ListForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      forms: []
    };
  }

  async componentWillMount() {
    try {
      const forms = await ApiService.getForms();
      this.setState({ forms });
    } catch (e) {
      console.log(e);
    }

  }

  render() {

    const { forms } = this.state;

    return (
      <React.Fragment>
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
              forms.map((prop, key) => {
                return (
                  <tr key={key} onClick={() => this.props.history.push(this.props.location.pathname +'/'+ prop._id)}>
                    <td key="Name">{prop.schema.schema.title}</td>
                    <td key="Description">{prop.schema.schema.description}</td>
                    <td key="responses">{prop.responses.length}</td>
                    <td
                      key="creationTime"
                      className="text-right"
                    >
                      {moment(prop.creationTime).format('llll')}
                    </td>
                  </tr>
                );

              }, this)
            }
            </tbody>
          </Table>
        </CardBody>
      </React.Fragment>
    );
  }
}

export default withRouter(ListForm);
