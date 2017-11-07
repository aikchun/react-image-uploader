import axios from 'axios';

import {
	CREATE_THUMBNAIL
} from './types';

import { headers } from '../utils';

const ROOT_URL = process.env.ROOT_URL;

export const createThumbnail = (data) => {
	const header = headers();

	header['headers']['content-type'] = "multipart/form-data";
	return (dispatch) => {
		console.log(data);
		const formData = new FormData();
		formData.append('files', data.file[0]);
		axios.post(`${ROOT_URL}/create-thumbnail`, formData, header).then((response) => {
			console.log(response);
		}).catch((response) => {
			console.log(response);
		});
	}
}
export const showThumbnail = () => {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/create-thumbnail`, headers()).then((response) => {
			console.log(response);
		}).catch((response) => {
			console.log(response);
		});
	}
}

export const test = () => {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/test`, headers()).then((response) => {
			console.log(response);
		}).catch((response) => {
			console.log(response);
		});
	}
}
