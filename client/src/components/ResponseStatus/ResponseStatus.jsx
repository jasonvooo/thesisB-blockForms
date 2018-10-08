import React from 'react';

import { Badge } from 'reactstrap';

class ResponseStatus extends React.Component {

  render() {
    const { status } = this.props;
    if (status === 'ACCEPT') {
      return <Badge color="success">Accepted</Badge>;
    }
    else if (status === 'DECLINED') {
      return <Badge color="danger">Declined</Badge>;
    }
  }
};

export default ResponseStatus;