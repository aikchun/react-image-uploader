import axios from 'axios';

import _ from 'lodash';

import {
	CREATE_THUMBNAIL
} from './types';

import { headers } from '../utils';

const ROOT_URL = process.env.ROOT_URL;

export const createThumbnail = (data) => {
	const header = headers();

	header['headers']['content-type'] = "multipart/form-data";
	return (dispatch) => {
		const formData = new FormData();
		
		_.forEach(data, (file) => {
			formData.append('files[]', file);
		});

		axios.post(`${ROOT_URL}/resize-upload`, formData, header).then((response) => {
			console.log(response);
		}).catch((response) => {
			console.log(response);
		});
	}
}
