import { getUser, addSeesion } from "../api";
export const autorize = async (uathLogin, outhPassword) => {
	const user = await getUser(uathLogin);

	if (!user) {
		return {
			error: 'такого пользователя не существует',
			res: null,
		};
	}

	if (outhPassword !== user.password) {
		return {
			error: 'неверный пароль',
			res: null,
		};
	}

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
}
