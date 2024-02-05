import React from 'react';

import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import AuthContext from '@/contexts/AuthContext';

const Header = () => {
	const { isAuth, logOut } = React.useContext(AuthContext);

	return (
		<Box component="header" className="header" sx={{ boxShadow: 1 }}>
			<Container>
				<Grid
					container
					sx={{
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Grid item>
						<Typography
							className="logo"
							sx={{
								padding: '20px 0',
								fontSize: '30px',
								fontWeight: 600,
							}}
						>
							MyChat
						</Typography>
					</Grid>
					<Grid item>
						{isAuth && (
							<Button
								variant="contained"
								onClick={() => logOut()}
							>
								Выйти
							</Button>
						)}
						{!isAuth && (
							<Button
								variant="contained"
								component={RouterLink}
								to="/login"
							>
								Войти
							</Button>
						)}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Header;
