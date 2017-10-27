import React from 'react';

// react-redux
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form';

// material-ui components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// form helpers
import { renderTextField, renderRaisedButton } from '../form-helpers/helpers';

class SigninForm extends React.Component {
	onSubmit(values) {
		console.log("on Submit");
	}
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<div style={ { margin: "0 auto", width: "90%" } }>
				<Card>
					<CardTitle title="Sign in"/>
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
										name="password"
										label="Password"
										component={ renderTextField }
										placeholer="Enter password"
										custom={ { type: "password" } }
									/>
								</div>
						
							<Field
								name="submit"
								label="Submit"
								type="submit"
								component={renderRaisedButton}
								disabled={ submitting }
								primary={ true }
							/>
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
    'password'
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
  return errors;
}

export default reduxForm({
	form: "signinForm",
	validate
})(
	connect(null, null)(SigninForm)
);
