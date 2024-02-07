import React, {useEffect} from 'react';
import { ThemeProvider } from '@mui/material';
import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom';
import {Provider, useDispatch} from 'react-redux';

import theme from '@/theme';
import AuthProvider from '@/providers/AuthProvider';
import {store} from '@/redux/store.js';

import { Login, Home, Page404, Registration } from '@/pages';
import {useAuth} from "@/hooks/useAuth.js";
import {setUser} from "@/redux/slices/userSlice.js";
import {useRefreshTokenMutation} from "@/redux/api/authApi.js";

 function RequireAuth ({children}) {
	const {isAuth} = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [
		refreshToken,
		result,
	] = useRefreshTokenMutation();


	useEffect( () => {
		if (isAuth) {
			return;
		}
		console.log(isAuth)
		refreshToken().unwrap()
			.catch(error => {
				console.log(error);
				navigate('/login');
			});

	}, [isAuth]);

	return children;
}

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: (<RequireAuth><Home /></RequireAuth>),
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
