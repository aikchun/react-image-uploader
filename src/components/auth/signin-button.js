import React from 'react';


// material-ui components
import FlatButton from 'material-ui/FlatButton';


class SigninButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<FlatButton label="Sign in"/> 
			</div>
		);
	}
}

export default SigninButton;
