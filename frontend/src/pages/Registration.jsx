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

const Registration = () => {
	const [error, setError] = React.useState('');
	const [isSuccess, setIsSuccess] = React.useState(false);
	const { logIn } = React.useContext(AuthContext);
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
		confirm_password: yup
			.string()
			.min(5, 'Не менее 5 символов')
			.max(32, 'Не более 32 символов')
			.required('Введите пароль')
			.oneOf([yup.ref('password')], 'Пароли не совпадают'),
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
		console.log(sendData);
		fetch(api.registrationPath(), {
			method: 'post',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(sendData),
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				if (json.statusCode && json.statusCode !== 200) {
					setError(json.message);
				} else {
					setIsSuccess(true);
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
							Регистрация
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
							<TextField
								{...register('confirm_password')}
								type="password"
								label="Повторите пароль"
								variant="outlined"
								size="small"
								fullWidth
								margin="normal"
								error={Boolean(errors.confirm_password)}
								helperText={errors.confirm_password?.message}
							/>
							<Button type="submit" variant="contained">
								Зарегестрироваться
							</Button>
							{error && (
								<Alert
									severity="error"
									sx={{ marginTop: '20px' }}
								>
									{error}
								</Alert>
							)}
							{isSuccess && (
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
							Есть аккаунта? <Link to="/login">Войти</Link>
						</Typography>
					</CardContent>
				</Card>
			</div>
		</Layout>
	);
};

export default Registration;
