import React from 'react';

// material-ui components
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

export const renderTextField = ({ input, label, meta: {touched, error}, ...custom }) => {
	return(
		<TextField
			hintText={label}
			floatingLabelText={label}
			errorText={touched && error}
			{ ...input }
			{ ...custom }
		/>
	);
}

export const renderRaisedButton = ({ input, label, primary, meta: {touched, error}, ...custom }) => {
	return(
		<RaisedButton
			label={ label }
			primary={ primary }
			{ ...input }
			{ ...custom }
		/>
	);
}
