const apiPath = '/api';

export default {
	loginPath: () => [apiPath, 'login'].join('/'),
	registrationPath: () => [apiPath, 'registration'].join('/'),
	dataPath: () => [apiPath, 'data'].join('/'),
};
