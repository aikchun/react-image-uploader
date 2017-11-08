import React from 'react';


// action creator
import { createThumbnail, showThumbnail, test} from '../actions/create-thumbnail-actions';

// react-redux
import { connect } from 'react-redux';

// redux-form
import { reduxForm, Form, Field } from 'redux-form';

// material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

// helpers
import { renderTextField } from './form-helpers/helpers';
import FileInput from './form-fields/file-input';

class SimpleForm extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSubmit(values) {
		this.props.createThumbnail(values);

	}

	render() {
		return(
			<div>
				<Card style={{ height: "300px", width: "95%", margin: "0 auto" }}>
					<CardHeader
						title="Upload"
						subtitle="File"
					/>
					<CardText>
						<Form onSubmit={ this.props.handleSubmit(this.handleSubmit.bind(this)) }>

							<div className="form-field">
								<Field
									type="file"
									name="file"
									component={ (field) => {
										delete field.input.value;
										return <input type="file" id="file" {...field.input} />;
									}}
								/>
							</div>

							<div className="form-field">
								<RaisedButton
									label="Submit"
									containerElement={
										<button type="submit">Submit</button>
									}
								/>

							</div>
						</Form>

					</CardText>
				</Card>
			</div>
		);
	}
}

export default reduxForm({
	form: 'FileUpload'
})(
connect(null, { createThumbnail, showThumbnail, test })(SimpleForm)
);
