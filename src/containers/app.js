import React from 'react';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reduxThunk from 'redux-thunk';
// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// custom components
import AppBar from "../components/app_bar";
import SimpleForm from '../components/simple_form';

// reducers
import reducers from '../reducers';


class App extends React.Component {

	constructor(props) {
		super(props);

	}

	createStore() {
		const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
		return createStoreWithMiddleware(reducers);
	}

	handleSubmit(values) {
	}


	render() {
		return (
			<Provider store={ this.createStore() }>
				<MuiThemeProvider>
					<div>
						<AppBar/>
						<SimpleForm/>
					</div>
				</MuiThemeProvider>
			</Provider>
		);
	}
}

export default App;
