import {
	SIGNIN,
	AUTH_USER,
	UNAUTH_USER
} from './types';

import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
	AuthenticationDetails
} from 'amazon-cognito-identity-js';

export const signin = ({ username, password }) => {
	return (dispatch) => {

		const authenticationData = {
			Username : username,
			Password : password,
		};

		const authenticationDetails = new AuthenticationDetails(authenticationData)

		const poolData = {
			UserPoolId : process.env.USER_POOL_ID, // Your user pool id here
			ClientId : process.env.CLIENT_ID // Your client id here
		}

		const userPool = new CognitoUserPool(poolData);

		const userData = {
				Username : authenticationData.Username,
				Pool : userPool
		};

		const cognitoUser = new CognitoUser(userData);

		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function (result) {
				const token = result.getAccessToken().getJwtToken();

				dispatch({ type: AUTH_USER, payload: { } })

				localStorage.setItem('token', token);

				//POTENTIAL: Region needs to be set if not already set previously elsewhere.
				AWS.config.region = process.env.REGION;

				const loginKey = `cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USER_POOL_ID}`

				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					IdentityPoolId : process.env.USER_POOL_ID, // your identity pool id here
					Logins : {
						// Change the key below according to the specific region your user pool is in.
						loginKey : result.getIdToken().getJwtToken()
					}
				});

				// Instantiate aws sdk service objects now that the credentials have been updated.
				// example: var s3 = new AWS.S3();

			},

			onFailure: function(err) {
				alert(err);
			},

		});

	}
}

export const signup = (data) => {
	return (dispatch) => {
		var poolData = {
			UserPoolId : process.env.USER_POOL_ID, // Your user pool id here
			ClientId : process.env.CLIENT_ID// Your client id here
		};
		const userPool = new CognitoUserPool(poolData);

		let attributeList = [];

		const dataEmail = {
			Name : 'email',
			Value : data.email
		};

		const attributeEmail = new CognitoUserAttribute(dataEmail);

		attributeList.push(attributeEmail);

		userPool.signUp(data.username, data.password, attributeList, null, function(err, result){
			if (err) {
				alert(err);
				return;
			}
			cognitoUser = result.user;
		});
	}
}

export const confirmUser = (data) => {
	return (dispatch) => {
		var poolData = {
        UserPoolId : process.env.USER_POOL_ID, // Your user pool id here
        ClientId : process.env.CLIENT_ID// Your client id here
    };

    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : data.username,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(data.code, true, function(err, result) {
        if (err) {
            alert(err);
            return;
        }
    });
	}
}

export const getAuthenticatedUser = () => {
	return (dispatch) => {
		const poolData = {
				UserPoolId : process.env.USER_POOL_ID, // Your user pool id here
				ClientId : process.env.CLIENT_ID// Your client id here
		};
		const userPool = new CognitoUserPool(poolData);
		const cognitoUser = userPool.getCurrentUser();
		if (cognitoUser != null) {
				cognitoUser.getSession(function(err, session) {
						if (err) {
								return;
						}
						localStorage.setItem('token', session.getIdToken().getJwtToken());
						dispatch({ type: AUTH_USER, payload: {} });
						// NOTE: getSession must be called to authenticate user before calling getUserAttributes
						cognitoUser.getUserAttributes(function(err, attributes) {
								if (err) {
										// Handle error
								} else {
										// Do something with attributes
								}
						});


						const loginKey = `cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USER_POOL_ID}`

						AWS.config.credentials = new AWS.CognitoIdentityCredentials({
								IdentityPoolId : process.env.USER_POOL_ID, // your identity pool id here
								Logins : {
										// Change the key below according to the specific region your user pool is in.
										loginKey : session.getIdToken().getJwtToken()
								}
						});

						// Instantiate aws sdk service objects now that the credentials have been updated.
						// example: var s3 = new AWS.S3();

				});
		} else {
			dispatch({ type: UNAUTH_USER, payload: {} });
		}

	}
}

export const signout = () => {
	return (dispatch) => {
		const poolData = {
				UserPoolId : process.env.USER_POOL_ID, // Your user pool id here
				ClientId : process.env.CLIENT_ID// Your client id here
		};

		const userPool = new CognitoUserPool(poolData);
		const cognitoUser = userPool.getCurrentUser();

		if (cognitoUser != null) {
			cognitoUser.signOut();
		} 

		localStorage.removeItem('token');
		dispatch({ type: UNAUTH_USER, payload: {} });
	}
}
