import React from 'react';

import { CardBody, CardHeader } from 'reactstrap';
import { FormViewer, PanelHeader } from 'components';
import { ApiService, HashingService, LocalStorageService, Ipfs } from 'services';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { userBlockFormsContract } from 'contracts/UserBlockFormsSimple';
import LoadingOverlay from 'react-loading-overlay';
import { HelperService } from '../../../../services';

class CompleteForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: null,
      formData: {},
      loading: false
    };

  }

  handleSubmit = async (data) => {
    this.setState({ loading: true });

    const transformedOutput = HelperService.transformFormOutput(data, this.state.form.schema.schema.properties);

    const hash = HashingService.getHash(transformedOutput);

    const contract = userBlockFormsContract(this.state.form.contractAddress);

    contract.methods.addFormResponse(this.state.form.name, hash)
    .send({
      from: LocalStorageService.getCurrentUser()
    }, async (err, response) => {

      if (err) {
        console.log('Error');
      } else {

        const ipfsString = await JSON.stringify(transformedOutput);
        const ipfsAddress = await Ipfs.add(ipfsString);

        const payload = {
          ipfsAddress,
          response: transformedOutput,
          hash: hash,
          tx: response
        };

        await ApiService.addResponseForm(this.state.form._id, payload);
        this.props.history.push(this.props.location.pathname.replace('/completeForm',''));
        window.location.reload();
      }
    });

  };

  async componentWillMount() {

    const response = this.props.form.responses.find((r) => r.responder === this.props.match.params.responderAddr);

    let formData= null;
    if (response.values.length) {
      formData = response.values[response.values.length-1].response;
    }

    this.setState({ form: this.props.form, formData });
  }

  render() {

    return (
      <React.Fragment>
        <CardHeader>Form Complete</CardHeader>
        <CardBody>
          <div
            className="map fill-height"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <LoadingOverlay
              spinner
              active={this.state.loading}
              text={'Please confirm the transaction to store a hash of your response!'}
            >

              {
                this.state.form ? (
                  <FormViewer
                    maxHeight={true}
                    form={this.state.form.schema}
                    formData={this.state.formData}
                    onSubmit={this.handleSubmit}
                  />
                ) : (
                  <h4 className="text-danger mt-3"><i
                    className="fa fa-exclamation-triangle"/> create form first.</h4>
                )
              }
            </LoadingOverlay>
          </div>
        </CardBody>
        {/*<code>{JSON.stringify(this.state.formData)}</code>*/}
      </React.Fragment>
    );
  }
}

export default withRouter(CompleteForm);
