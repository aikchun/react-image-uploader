export const headers = () => {
	console.log(localStorage.getItem('token'));
	return {
		headers: new Headers({ 'Authorization': `${localStorage.getItem('token')}` })
	}
}
