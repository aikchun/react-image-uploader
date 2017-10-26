import React from 'react';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// custom components
import AppBar from "../components/app_bar";

const App = () => {
	return (
		<MuiThemeProvider>
			<div>
				<AppBar/>
			</div>
		</MuiThemeProvider>
	);
}

export default App;
