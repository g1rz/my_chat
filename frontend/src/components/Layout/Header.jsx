import { Box, Container, Typography, Grid, Button } from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";

import {useAuth} from "@/hooks/useAuth.js";
import {removeUser} from "@/redux/slices/userSlice.js";
import {useLogoutMutation} from "@/redux/api/authApi.js";


const Header = () => {
	const { isAuth } = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [logout] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			const userData = await logout().unwrap()

			console.log(userData);

			dispatch(removeUser());
			setTimeout(() => {
				navigate('/login');
			}, 1000);
		} catch (error) {
			console.log(error)
		}
	}

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
								onClick={() => handleLogout()}
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
