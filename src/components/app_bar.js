import React from "react";

// material-ui components
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

// react router
import { Link } from 'react-router-dom';

// custom components
import SigninButton from './auth/signin-button';


class CustomAppBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<AppBar
					title="File Upload"
					showMenuIconButton={false}
				  iconElementRight={<Link to="/signin"><FlatButton label="Sign In" labelStyle={{ color: "white"}}/></Link>}
				/>
			</div>
		);
	}
}

export default CustomAppBar;
