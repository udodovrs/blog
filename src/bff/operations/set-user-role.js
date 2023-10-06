import { updateUserRole, getSession } from '../api';
import { ROLE } from '../constants/role';

export const setUserRole = async (userSession, userId, newRoleId) => {
	const accessRoles = [ROLE.ADMIN];
	const session = await getSession(userSession);
	const access = accessRoles.includes(session?.role_id);

	if (!session && !access) {
		return {
			error: 'У вас недостаточно прав',
			res: null,
		};
	}

	await updateUserRole(userId, newRoleId);

	return {
		error: null,
		res: 'Роль ползоваткля успешно обновлена',
	};
};
