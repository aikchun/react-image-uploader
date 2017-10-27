import React from 'react';

// react-redux
import { connect } from 'react-redux';

// redux-form
import { reduxForm, Form, Field } from 'redux-form';

// material-ui components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// form helpers
import { renderTextField, renderRaisedButton } from '../form-helpers/helpers';

class SignupForm extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit(values) {
		console.log(values);
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return(
			<div style={ { margin: "0 auto", width: "90%" } }>
				<Card>
					<CardTitle title="Sign Up"/>
						<CardText>
							<Form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
								<div>
									<Field
										name="email"
										label="Email"
										component={ renderTextField }
										placeholder="Email"
										custom={ { type: "email" } }
									/>
								</div>

								<div>
									<Field
										name="username"
										label="Username"
										component={ renderTextField }
										placeholder="Username"
										custom={ { type: "text" } }
									/>
								</div>
							
								<div>
									<Field
										name="password"
										label="Password"
										component={ renderTextField }
										placeholer="Enter password"
										custom={ { type: "password" } }
									/>
								</div>

								<div>
									<Field
										name="confirm_password"
										label="Confirm Password"
										component={ renderTextField }
										placeholer="Confirm password"
										custom={ { type: "password" } }
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
    'email',
    'username',
    'password',
    'confirm_password'
  ];

	requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });

	if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  if (values.password != values.confirm_password) {
  	errors.confirm_password = "Your passwords do not match";
  }

  return errors;
}

export default reduxForm({
	form: "signupForm",
	validate
})(
	connect()(SignupForm)
);
