import React from 'react';
import { ThemeProvider } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import theme from '@/theme';
import AuthProvider from '@/providers/AuthProvider';
import store from '@/slices/index.js';

import { Login, Home, Page404, Registration } from '@/pages';

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
			errorElement: <Page404 />,
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/registration',
			element: <Registration />,
		},
	]);

	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</Provider>
		</ThemeProvider>
	);
};

export default App;
