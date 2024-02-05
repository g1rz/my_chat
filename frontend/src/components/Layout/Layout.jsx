import { Container } from '@mui/material';

import Header from './Header';

import './Layout.scss';

export const Layout = ({ children }) => {
	return (
		<div className="app">
			<Header />
			<main className="main-content">
				<Container sx={{ height: '100%' }}>{children}</Container>
			</main>

			<footer className="footer"></footer>
		</div>
	);
};
