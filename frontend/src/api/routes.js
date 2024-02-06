const apiPath = '/api';

export const apiEndpoints = {
	baseApiPath: () => apiPath,
	loginPath: () => [apiPath, 'login'].join('/'),
	registrationPath: () => [apiPath, 'registration'].join('/'),
	dataPath: () => [apiPath, 'data'].join('/'),
};
