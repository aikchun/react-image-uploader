import React from "react";

// react redux
import { connect } from 'react-redux';

// material-ui components
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// react router
import { Link } from 'react-router-dom';

// custom components
import SigninButton from './auth/signin-button';


class CustomAppBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false }
	}

	toggleDrawer() {
		this.setState({ ...this.state, open: !this.state.open })
	}

	renderSigninLink() {
		const { authenticated } = this.props.auth;
		if (authenticated) {
			return (
				<Link to="/signout"><FlatButton label="Sign Out" labelStyle={{ color: "white"}}/></Link>
			);
		}
		return (
			<Link to="/signin"><FlatButton label="Sign In" labelStyle={{ color: "white"}}/></Link>
		);
	}

	render() {

		const signInLink = this.renderSigninLink();

		return (
			<div>
				<AppBar
					title={<span style={ { cursor: 'pointer' } }>File Upload</span>}
				  iconElementRight={ signInLink }
					onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) }
					onTitleTouchTap={ () => { this.props.history.push('/') } }
				/>

				<Drawer
					open={ this.state.open }
					docked={false}
					onRequestChange={ this.toggleDrawer.bind(this) }
				>
          <Link
						to="/signup"
						style={ { textDecoration: 'none' } }
					>
						<MenuItem
							onClick={ this.toggleDrawer.bind(this) }
						>Sign Up
						</MenuItem>
					</Link>
					<Link
						to="/confirm-user"
						style={ { textDecoration: 'none' } }
					>
						<MenuItem onClick={ this.toggleDrawer.bind(this) }>Confirm User</MenuItem>
					</Link>
        </Drawer>
			</div>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth }
}

export default connect(mapStateToProps)(CustomAppBar);
