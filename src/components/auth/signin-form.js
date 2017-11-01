import React from 'react';

// action creator
import { signin } from '../../actions/auth-actions';

// react-redux
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form';

// react-router-dom
import { Redirect } from 'react-router-dom';

// material-ui components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// form helpers
import { renderTextField, renderRaisedButton } from '../form-helpers/helpers';

class SigninForm extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit(values) {
		this.props.signin(values);
	}

	render() {

		if (this.props.authenticated) {
			const { from } = this.props.location.state || { from: { pathname: '/' } };
			return <Redirect to={ from }/>
		}

		const { handleSubmit, pristine, submitting } = this.props;

		return (
			<div style={ { margin: "0 auto", width: "90%" } }>
				<Card>
					<CardTitle title="Sign in"/>
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
										name="password"
										label="Password"
										component={ renderTextField }
										placeholer="Enter password"
										type="password"
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
    'password'
  ];
	requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });

  return errors;
}

const mapStateToProps = ({ auth: { authenticated } }) => {
	return { authenticated }
}

export default reduxForm({
	form: "signinForm",
	validate
})(
	connect(mapStateToProps, { signin })(SigninForm)
);
