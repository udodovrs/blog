import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Navigate } from 'react-router-dom';
import { server } from '../../bff';
import { InputText } from '../../components/input/input-text';
import { Button } from '../../components/button/button';
import { ErrorArea } from '../../components/styled-block-error-area/error-area';
import { Form } from '../../components/styled block-form/form';
import { Wrapper } from '../../components/styled-block-wrapper/wrapper';
import { setUser } from '../../actions';
import { userSelector } from '../../selectors/user-selector';
import { useResetForm } from '../../hooks/use-reset-form';
import { setUserLocalstorage } from '../../use-localstorage/set-user-localstorage';
import { ROLE } from '../../constants/role';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Логин может содержать только буквы и цифры')
		.min(3, 'Логин не может быть короче 3 символов')
		.max(15, 'Логин не может быть длинне 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w%#]+$/, 'Логин может содержать только буквы, цифры и знаки %, #')
		.min(6, 'Парроль не может быть короче 6 символов')
		.max(20, 'Логин не может быть длинне 20 символов'),
	passcheck: yup
		.string()
		.required('Заполните проверку пароля')
		.oneOf([yup.ref('password'), null], 'Пароли несовпадают'),
});

export const Registration = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	localStorage.setItem('myCat', 'Tom');
	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ res, error }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(res));
			setUserLocalstorage();
		});
	};

	const errorForm =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = serverError || errorForm;

	if (user.roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<Wrapper>
			<h2>Регистрация</h2>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<InputText
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => {
							if (serverError) {
								setServerError(null);
							}
						},
					})}
					width="100%"
				/>
				<InputText
					type="password"
					placeholder="Пароль..."
					width="100%"
					{...register('password', {
						onChange: () => {
							if (serverError) {
								setServerError(null);
							}
						},
					})}
				/>
				<InputText
					type="password"
					placeholder="Проверка пароля..."
					width="100%"
					{...register('passcheck', {
						onChange: () => {
							if (serverError) {
								setServerError(null);
							}
						},
					})}
				/>
				<Button type="submit" disabled={!!errorForm} width={'220px'}>
					Зарегистрироваться
				</Button>
			</Form>
			{errorMessage && <ErrorArea>{errorMessage}</ErrorArea>}
		</Wrapper>
	);
};
