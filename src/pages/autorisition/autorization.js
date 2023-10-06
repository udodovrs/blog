import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom';
import { server } from '../../bff';
import { InputText } from '../../components/input/input-text';
import { Button } from '../../components/button/button';
import { ErrorArea } from '../../components/styled-block-error-area/error-area';
import { Form } from '../../components/styled block-form/form';
import { Wrapper } from '../../components/styled-block-wrapper/wrapper';
import { setUser } from '../../actions';
import { userSelector } from '../../selectors/user-selector';
import { ROLE } from '../../constants/role';
import { useResetForm } from '../../hooks/use-reset-form';
import { setUserLocalstorage } from '../../use-localstorage/set-user-localstorage';
import styled from 'styled-components';

const StyledLink = styled(Link)`
	text-decoration: underline;
	color: blue;
	font-size: large;
	margin-top: 30px;
`;

const authFormSchema = yup.object().shape({
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
});

export const Autorisation = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const user = useSelector(userSelector);

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		server.autorize(login, password).then(({ res, error }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			setUserLocalstorage();
		});
	};

	const errorForm = errors?.login?.message || errors?.password?.message;
	const errorMessage = serverError || errorForm;

	if (user.roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<Wrapper>
			<h2>Авторизация</h2>
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
				<Button type="submit" disabled={!!errorForm} width={'200px'}>
					Авторизоваться
				</Button>
			</Form>
			{errorMessage && <ErrorArea>{errorMessage}</ErrorArea>}
			<StyledLink to={'/register'}>Зарегистрироваться</StyledLink>
		</Wrapper>
	);
};
