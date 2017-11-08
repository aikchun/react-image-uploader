export const headers = () => {
	return {
		headers: new Headers({ 'Authorization': `${localStorage.getItem('token')}` })
	}
}
