import { deleteUser, getSession } from '../api';
import { ROLE } from '../constants/role';

export const fetchDeleteUser = async (userSession, userId) => {
	const accessRoles = [ROLE.ADMIN];
	const session = await getSession(userSession);
	const access = accessRoles.includes(session?.role_id);

	if (!session && !access) {
		return {
			error: 'У вас недостаточно прав',
			res: null,
		};
	}

	 await deleteUser(userId);

	return {
		error: null,
		res: 'Пользователь успешно удален',
	};
};
