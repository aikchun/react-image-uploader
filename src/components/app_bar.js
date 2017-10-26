import React from "react";

import AppBar from 'material-ui/AppBar';


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
				/>
			</div>
		);
	}
}

export default CustomAppBar;
