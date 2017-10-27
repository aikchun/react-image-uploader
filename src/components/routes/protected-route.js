import React, { Component } from 'react';

import {
  Route,
  Redirect,
} from 'react-router-dom';

import { connect } from 'react-redux';

class ProtectedRoute extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const { component: Component, ...rest } = this.props;

		const { authenticated } = this.props.auth;

    return(
      <Route {...rest} render={ (props) => (
				authenticated ?
          <Component {...this.props}/>
        :
          <Redirect to={{
            pathname: '/signin',
            state: { from: this.props.location }
          }}
        />

      )}/>
    );
  }
}

const mapStateToProps = ({ auth }) => {
	return { auth }
}
export default connect(mapStateToProps)(ProtectedRoute);
