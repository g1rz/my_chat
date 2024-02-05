const apiPath = '/api';

export default {
	baseApiPath: () => apiPath,
	loginPath: () => [apiPath, 'login'].join('/'),
	registrationPath: () => [apiPath, 'registration'].join('/'),
	dataPath: () => [apiPath, 'data'].join('/'),
};
