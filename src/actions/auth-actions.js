import { SIGNIN } from './types';

import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

export const signin = ({ username, password }) => {
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
			console.log('access token + ' + result.getAccessToken().getJwtToken());

			//POTENTIAL: Region needs to be set if not already set previously elsewhere.
			AWS.config.region = process.env.REGION;

			AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				IdentityPoolId : process.env.USER_POOL_ID, // your identity pool id here
				Logins : {
					// Change the key below according to the specific region your user pool is in.
					'cognito-idp.' + process.env.REGION + '.amazonaws.com/'+ process.env.USER_POOL_ID : result.getIdToken().getJwtToken()
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
