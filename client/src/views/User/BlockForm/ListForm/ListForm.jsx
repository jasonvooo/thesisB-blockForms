import React from 'react';

import { CardBody, CardHeader, CardTitle, Table } from 'reactstrap';
import { Button, PanelHeader, ResponseStatus } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService, HelperService, LocalStorageService } from 'services';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const baseHeaders = [
  'Name', 'Description', 'No. Responders', 'Date Created'
];
let headers = baseHeaders;

class ListForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      forms: [],
      isResponder: false
    };
  }

  redirect = (formId) => {
    if (this.state.isResponder) {
      const currentUser = LocalStorageService.getCurrentUser();
      this.props.history.push(`/responder/forms/${formId}/response/${currentUser}`);
    } else {
      this.props.history.push(`/creator/forms/${formId}`);
    }
  };

  async componentWillMount() {
    try {
      const isResponder = LocalStorageService.isResponder();
      const forms = await ApiService.getForms(isResponder);

      if (isResponder) {
        // headers.pop();
        // headers.pop();
        headers = baseHeaders.slice(0, 2);
        headers.push('Status');
      }

      this.setState({ forms, isResponder });
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
                  <tr key={key} onClick={() => this.redirect(prop._id)}>
                    <td key="Name">{prop.schema.schema.title}</td>
                    <td key="Description">{prop.schema.schema.description}</td>

                    {
                      !this.state.isResponder ?
                        <React.Fragment>
                          <td key="responses">{prop.responses.length}</td>
                          <td
                            key="creationTime"
                            className="text-right"
                          >
                            {moment(prop.creationTime).format('llll')}
                          </td>
                        </React.Fragment>
                        :
                        <td key="status"><ResponseStatus status={prop.responses[0].status}/></td>
                    }

                  </tr>
                );

              }, this)
            }
            </tbody>
          </Table>

          {!this.state.isResponder &&
          <Button onClick={() => this.props.history.push('/creator/builder')}>Create Form</Button>}

        </CardBody>
      </React.Fragment>
    );
  }
}

export default withRouter(ListForm);
