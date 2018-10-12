import React from 'react';

import { Table } from 'reactstrap';
import { PanelHeader, ResponseStatus } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService, HelperService } from 'services';
import { withRouter } from 'react-router-dom';

const headers = [
  'Address', 'Email', 'Status', 'No. Responses', 'Last Response'
];

class ResponderTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { form } = this.props;
    const { responses } = form;

    return (
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
          responses.map((prop, key) => {
            return (
              <tr key={key} onClick={() => this.props.history.push(`/creator/forms/${form._id}/response/${prop.responder}`)}>
                <td key="Address">{prop.responder}</td>
                <td key="Email">{prop.email}</td>
                <td key="Status"><ResponseStatus status={prop.status}/></td>
                <td key="responses">{prop.values.length}</td>
                <td
                  key="lastResponse"
                  className="text-right"
                >
                  {prop.values.length && HelperService.formatDate(prop.values[prop.values.length - 1].timeStamp)}
                </td>
              </tr>
            );

          }, this)
        }
        </tbody>
      </Table>
    );
  }
}

export default withRouter(ResponderTable);
