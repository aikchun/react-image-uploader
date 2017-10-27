import React from 'react';

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

    return(
      <Route {...rest} render={ (props) => (
        localStorage.getItem('token') ?
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

export default (ProtectedRoute);
