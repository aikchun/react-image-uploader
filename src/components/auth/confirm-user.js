import React from 'react';

// react-redux
import { connect } from 'react-redux';

// redux-form
import { reduxForm, Form, Field } from 'redux-form';

// action creators
import { confirmUser } from '../../actions/auth-actions';

// material-ui components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// form helpers
import { renderTextField, renderRaisedButton } from '../form-helpers/helpers';

class ConfirmUser extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit(values) {
		this.props.confirmUser(values);
	}

	render() {

		const { handleSubmit, pristine, submitting } = this.props;

		return(
			<div style={ { margin: "0 auto", width: "90%" } }>
				<Card>
					<CardTitle title="Confirm User"/>
						<CardText>
							<Form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
								<div>
									<Field
										name="username"
										label="Username"
										component={ renderTextField }
										custom={ { type: "text" } }
									/>
								</div>
							
								<div>
									<Field
										name="code"
										label="Confirmation Code"
										component={ renderTextField }
										placeholer="Enter code"
										custom={ { type: "text" } }
									/>
								</div>
						
								<div>
									<Field
										name="submit"
										label="Submit"
										type="submit"
										component={renderRaisedButton}
										disabled={ submitting }
										primary={ true }
									/>
								</div>
						</Form>
					</CardText>
				</Card>
			</div>
		);
	}

}

const validate = (values) => {
	const errors = {};

	const requiredFields = [
    'username',
    'code'
  ];

	requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });

  return errors;
}

export default reduxForm({
	form: "confirmUser",
	validate
})(
	connect(null, { confirmUser })(ConfirmUser)
);
