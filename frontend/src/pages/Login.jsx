import { Layout } from '@/components/Layout/Layout';
import {
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import api from '@/api/routes';
import React from 'react';
import AuthContext from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [isInvalid, setIsInvalid] = React.useState(false);
	const [isSuccessAuth, setIsSuccessAuth] = React.useState(false);
	const { logIn, logOut } = React.useContext(AuthContext);
	const navigate = useNavigate();

	const schema = yup.object().shape({
		email: yup
			.string()
			.email('Некорректный email')
			.required('Введите email'),
		password: yup
			.string()
			.min(5, 'Не менее 5 символов')
			.max(32, 'Не более 32 символов')
			.required('Введите пароль'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmitHandler = (data) => {
		reset();
		const sendData = {
			email: data.email,
			password: data.password,
		};
		fetch(api.loginPath(), {
			method: 'post',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(sendData),
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.statusCode === 400) {
					setIsInvalid(true);
					logOut();
				} else {
					setIsInvalid(false);
					setIsSuccessAuth(true);
					localStorage.setItem('token', json.token);
					logIn();
					setTimeout(() => {
						navigate('/');
					}, 1000);
				}
			});
	};

	return (
		<Layout>
			<div className="center">
				<Card sx={{ maxWidth: 400, width: '100%' }}>
					<CardContent>
						<Typography variant="h1" className="title">
							Войти
						</Typography>
						<form onSubmit={handleSubmit(onSubmitHandler)}>
							<TextField
								{...register('email')}
								label="Ваш email"
								variant="outlined"
								size="small"
								fullWidth
								margin="normal"
								error={Boolean(errors.email)}
								helperText={errors.email?.message}
							/>
							<TextField
								{...register('password')}
								type="password"
								label="Пароль"
								variant="outlined"
								size="small"
								fullWidth
								margin="normal"
								error={Boolean(errors.password)}
								helperText={errors.password?.message}
							/>

							<Button type="submit" variant="contained">
								Войти
							</Button>
							{isInvalid && (
								<Alert
									severity="error"
									sx={{ marginTop: '20px' }}
								>
									Email или пароль неверные
								</Alert>
							)}
							{isSuccessAuth && (
								<Alert
									severity="success"
									sx={{ marginTop: '20px' }}
								>
									Вы успешно авторизовались
								</Alert>
							)}
						</form>
					</CardContent>
					<CardContent>
						<Typography>
							Нет аккаунта?{' '}
							<Link to="/registration">Регистрация</Link>
						</Typography>
					</CardContent>
				</Card>
			</div>
		</Layout>
	);
};

export default Login;
