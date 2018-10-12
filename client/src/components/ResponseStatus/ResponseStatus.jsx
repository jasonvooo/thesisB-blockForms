import React from 'react';

import { Badge } from 'reactstrap';

class ResponseStatus extends React.Component {

  render() {
    const { status } = this.props;
    if (status === 'ACCEPTED') {
      return <Badge color="success">Accepted</Badge>;
    }
    else if (status === 'REJECTED') {
      return <Badge color="danger">Declined</Badge>;
    }

    return <Badge color="warning">Pending</Badge>;
  }
};

export default ResponseStatus;