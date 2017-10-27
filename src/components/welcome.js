import React, { Component } from 'react';


import { Card, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Welcome extends Component {
	render() {
		const spacingBetweenLines = { height: "50px" };
		return(
			<div style={{ width: "90%", margin: "0 auto"}}>
				<Card>
					<CardTitle title="Welcome to Yet Another Picture Resizing App"/>
					<CardText>
						<div style={ spacingBetweenLines }>
							This is a single Page application.
							Powered by React, material-ui and AWS Lambda.
						</div>
						<div style={ spacingBetweenLines }>
							Links:
						</div>
						<div>

							<FlatButton
								href="https://github.com/AikChun/react-image-uploader"
								label="Github"
							/>

							<FlatButton
								href="http://www.material-ui.com/"
								label="Material UI"
							/>

							<FlatButton
								href="https://reactjs.org/"
								label="React"
							/>

							<FlatButton
								href="https://aws.amazon.com/"
								label="AWS"
							/>
						</div>
					</CardText>
				</Card>
			</div>
		);
	}
}
