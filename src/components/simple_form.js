import React from 'react';


import { connect } from 'react-redux';

// redux-form
import { reduxForm, Form } from 'redux-form';

// material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class SimpleForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { filename: this.defaultFileInputLabel() }
	}

	handleSubmit(values) {
		console.log(values);
	}

	handleFileUploadChange(e) {
		if (e.target.files[0]) {
			this.setState({ filename: e.target.files[0]['name'] });
		} else {
			this.setState({ filename: this.defaultFileInputLabel() });
		}
	}

	defaultFileInputLabel() {
		return "Upload a file";
	}

	render() {
		const filename = this.state.filename;
		return(
			<div>
				<Card style={{ height: "300px"}}>
					<CardHeader
						title="Upload"
						subtitle="File"
					/>
					<Form onSubmit={ this.props.handleSubmit(this.handleSubmit.bind(this)) }>
						<RaisedButton
							 containerElement='label' // <-- Just add me!
							 label={ filename }>
							 <input type="file" style={{ display: 'none' }} onChange={ this.handleFileUploadChange.bind(this) }/>
						</RaisedButton>
					</Form>
				</Card>
			</div>
		);
	}
}

export default reduxForm({
	form: 'FileUpload'
})(
connect()(SimpleForm)
);
