import axios from 'axios';
let instance = axios.create({
	baseURL: 'http://localhost:5050/api/v1',
	timeout: 5000,
});

if (process.env.NODE_ENV === 'production') {
	instance = axios.create({
		baseURL: '/api/v1',
		timeout: 5000,
	});
}

const setAuthToken = (token) => {
	if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	else delete instance.defaults.headers.common['Authorization'];
};

export default instance;
export { setAuthToken };
