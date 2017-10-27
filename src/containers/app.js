import React from 'react';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reduxThunk from 'redux-thunk';

// reducers
import reducers from '../reducers';

// react-router
import {
	Link,
	BrowserRouter,
	Switch,
	Route
} from 'react-router-dom';


// custom components
import AppBar from "../components/app_bar";
import Welcome from "../components/welcome";
import SimpleForm from '../components/simple-form';
import SigninForm from '../components/auth/signin-form';
import SignupForm from '../components/auth/signup-form';
import ConfirmUser from '../components/auth/confirm-user';
import ProtectedRoute from '../components/routes/protected-route';



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
					<BrowserRouter>
						<div>
							<AppBar/>
							<Switch>
								<Route exact path="/" component={ Welcome } />
								<Route exact path="/signin" component={ SigninForm } />
								<Route exact path="/signup" component={ SignupForm } />
								<Route exact path="/confirm-user" component={ ConfirmUser } />
								<ProtectedRoute exact path="/upload" component={ SimpleForm }/>
							</Switch>
						</div>
					</BrowserRouter>
				</MuiThemeProvider>
			</Provider>
		);
	}
}

export default App;
