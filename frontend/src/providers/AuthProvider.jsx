import React from 'react';
import AuthContext from '@/contexts/AuthContext';

const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = React.useState(
		Boolean(localStorage.getItem('token'))
	);

	const logIn = () => {
		setIsAuth(true);
	};

	const logOut = () => {
		setIsAuth(false);
	};

	return (
		<AuthContext.Provider value={{ isAuth, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
