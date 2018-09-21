import React from 'react';
import { Provider } from "react-redux"

import {
    Row, Col,
    Card, CardHeader, CardBody
} from 'reactstrap';
import configureStore from 'components/FormBuilder/store/configureStore';
import {PanelHeader} from 'components';
import FormBuilder_UserForm from 'components/FormBuilder/components/UserForm';

let FormBuilder = {
    Viewer: FormBuilder_UserForm
};

class CompleteForm extends React.Component {

    constructor(props) {
        super(props);

        let form = window.localStorage.getItem('foorious:formbuilder:form') ? JSON.parse(window.localStorage.getItem('foorious:formbuilder:form')) : null;

        this.state = {
            form: form,
            formData: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.store = configureStore({
            notifications: [],
        });
    }

    handleSubmit(data) {
        this.setState({
            formData: data
        });
    }

    render() {
        return (
            <div>
                <PanelHeader size="sm"/>
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>Form Complete</CardHeader>
                                <CardBody>
                                    <div id="completeForm" className="map"
                                         style={{position: "relative", overflow: "hidden"}}>

                                        {
                                            this.state.form ? (
                                                <Provider store={this.store}>
                                                    <FormBuilder.Viewer schema={this.state.form.schema} uiSchema={this.state.form.uiSchema} formData={this.state.formData} onSubmit={this.handleSubmit} />
                                                </Provider>
                                            ) : (
                                                <h4 className="text-danger mt-3"><i className="fa fa-exclamation-triangle" /> create form first.</h4>
                                            )
                                        }
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <code>{JSON.stringify(this.state.formData)}</code>

                </div>
            </div>
        );
    }
}

export default CompleteForm;
