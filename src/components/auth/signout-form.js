import React from 'react';

// action creator
import { signout } from '../../actions/auth-actions';

// react-redux
import { connect } from 'react-redux';


// react-router
import { Redirect } from 'react-router-dom';


class SignoutForm extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.signout();
	}
	render() {
		if (!this.props.authenticated) {
			return (
				<Redirect to="/" />
			);
		}

		return(
			<div>
			</div>
		);
	}
}

const mapStateToProps = ({ auth: { authenticated } }) => {
	return { authenticated }
}

export default connect(mapStateToProps, { signout })(SignoutForm);
