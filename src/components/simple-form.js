import React from 'react';


// action creator
import { createThumbnail, showThumbnail, test} from '../actions/create-thumbnail-actions';

// react-redux
import { connect } from 'react-redux';

// redux-form
import { reduxForm, Form, Field } from 'redux-form';

// react-dropzone
import Dropzone from 'react-dropzone';

// material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

// helpers
import { renderTextField } from './form-helpers/helpers';
import FileInput from './form-fields/file-input';
import _ from 'lodash';

class SimpleForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dropzoneText: "Drop your files here" };
	}

	handleSubmit(values) {

		this.props.createThumbnail(this.state.fileList);
	}

	handleFilesDropped(acceptedFiles, rejectedFiles, event) {
		const filenames = _.map(acceptedFiles, (file) => {
			return (<p style={ { marginLeft: '5px' } } key={ `files_${file.preview}` }> { file.name } </p>);
		});

		this.setState({
			...this.state,
			dropzoneText: filenames,
			fileList: event.target.files
		});
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
							<Dropzone
								onDrop={ this.handleFilesDropped.bind(this) }
							>
								{ this.state.dropzoneText }
							</Dropzone>

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
