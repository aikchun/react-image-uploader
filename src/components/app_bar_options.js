import React from 'react';

// react-redux
import { connect } from 'react-redux';

// react-router
import { Link } from 'react-router-dom';

// material-ui
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';

class AppBarOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
	}

	toggleIconMenu() {
		this.setState({ ...this.state, open: !this.state.open });
	}

	renderSigninOrSignout() {
		if (this.props.authenticated) {
			return (
						<MenuItem
							primaryText="Sign out" 
							containerElement={<Link to="/signout" />}
							onClick={ this.toggleIconMenu.bind(this) }
						/>
			);
		}
		return (
			<div>
				<MenuItem
					primaryText="Sign up" 
					containerElement={<Link to="/signup" />}
					onClick={ this.toggleIconMenu.bind(this) }
				/>
				<MenuItem
					primaryText="Sign in" 
					containerElement={<Link to="/signin" />}
					onClick={ this.toggleIconMenu.bind(this) }
				/>
			</div>
		);
	}
	render() {
		const signinOrSignout = this.renderSigninOrSignout();
		return(
			<div>

					<IconMenu
						iconButtonElement={<IconButton><MoreVertIcon color="white"/></IconButton>}
						targetOrigin={{horizontal: 'right', vertical: 'top'}}
						anchorOrigin={{horizontal: 'right', vertical: 'top'}}
							onRequestChange={ (open) => this.setState({ ...this.state, open }) }
						onClick={ this.toggleIconMenu.bind(this) }
						open={ this.state.open }
					>
						{ signinOrSignout }

				</IconMenu>
			</div>
		);
	}
}

const mapStateToProps = ({ auth: { authenticated } }) => {
	return { authenticated };
}
export default connect(mapStateToProps, null)(AppBarOptions);
