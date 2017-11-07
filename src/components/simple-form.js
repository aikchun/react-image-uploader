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

class SimpleForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { filename: this.defaultFileInputLabel() }
	}

	handleSubmit(values) {
		//this.props.showThumbnail();
		console.log("values: ", values)
		this.props.createThumbnail(values);
		//this.props.test();

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
				<Card style={{ height: "300px", width: "95%", margin: "0 auto" }}>
					<CardHeader
						title="Upload"
						subtitle="File"
					/>
					<CardText>
						<Form onSubmit={ this.props.handleSubmit(this.handleSubmit.bind(this)) }>
							<div >
								<Field
									name="name"
									floatingLabelText="Name"
									component={ renderTextField }
									label="Name"
									fullWidth
								/>
							</div>

							<div className="form-field">
								<Field
									name="file"
									label="File"
									type="file"
									multiple="true"
									component={ ({ input, label, meta: { touched, error }, ...custom }) => {
										delete input.value;
										return (
											<div>
												<label htmlFor={ input.name }>{ custom.label } </label>
												<input
													{ ...input }
													{ ...custom }
												/>
											</div>
										);

									} }
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
