import React from 'react';

import { Table } from 'reactstrap';
import { PanelHeader } from 'components';
import { tbody, thead } from 'variables/general';
import { ApiService } from 'services';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

const headers = [
  'Address', 'Email', 'No. Responses', 'Last Response'
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
                <td key="responses">{prop.values.length}</td>
                <td
                  key="lastResponse"
                  className="text-right"
                >
                  {prop.values.length && moment(prop.values[prop.values.length - 1].timeStamp).format('llll')}
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
