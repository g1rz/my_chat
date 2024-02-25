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

		refreshToken().unwrap()
			.catch(error => {
				console.log(error);
				navigate(apiEndpoints.loginPath());
			});

	}, [isAuth]);

	return children;
}
