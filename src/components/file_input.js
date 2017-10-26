import React, { Component } from 'react';

import Upload from 'material-ui-upload/Upload';

class FileInput extends Component {
		constructor (props) {
			super(props);
		}

    onFileLoad (e, file) {
    	console.log(e.target.result, file.name);
    }

    render() {
        return (
            <Upload label="Add" onFileLoad={this.onFileLoad}/>
        );
    }
}

export default FileInput;
