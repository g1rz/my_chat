import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Alert,
} from '@mui/material';

import {useLoginMutation} from "@/redux/api/authApi.js";
import {setUser} from "@/redux/slices/userSlice.js";

import { Layout } from '@/components/Layout/Layout';

const Login = () => {
	const [isInvalid, setIsInvalid] = React.useState(false);
	const [isSuccessAuth, setIsSuccessAuth] = React.useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login] = useLoginMutation();

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

	const onSubmitHandler = async (data) => {
		reset();
		const sendData = {
			email: data.email,
			password: data.password,
		};

		try {
			await login(sendData).unwrap()

			setIsSuccessAuth(true);
			setIsInvalid(false);

			setTimeout(() => {
				navigate('/');
			}, 1000);
		} catch (error) {
			console.log(error)
			setIsInvalid(true);
		}
	};

	useEffect(() => {

	}, []);


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
