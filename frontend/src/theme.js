import { createTheme } from '@mui/material';

const theme = createTheme({
	typography: {
		h1: {
			fontSize: '3rem',
			marginBottom: 20,
		},
		h2: {
			fontSize: '2rem'
		}, 
		h3: {
			fontSize: '1.5rem',
			fontWeight: 500
		}, 
		h4: {
			fontSize: '1.2rem',
			fontWeight: 500
		}
	},
	components: {
		Card: {
			padding: 40,
		},
	},
});

export default theme;
