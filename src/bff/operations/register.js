import { getUser, addUser, addSeesion } from '../api';
import { getDateNow } from '../utils';

export const register = async (regLogin, regPassword) => {
	const regUser = await getUser(regLogin);

	if (regUser) {
		return {
			error: 'такой логин уже занят',
			res: null,
		};
	}

	const user = await addUser(regLogin, regPassword, getDateNow);
	const hash = Math.random().toFixed(50);
	await addSeesion(hash, user.role_id);

	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.role_id,
			session: hash,
		},
	};
};
