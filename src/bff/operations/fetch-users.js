import { getUsers, getSession } from '../api';
import { ROLE } from '../constants/role';

export const fetchUsers = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];
	const session = await getSession(userSession);
	const access = accessRoles.includes(session?.role_id);

	if (!session && !access) {
		return {
			error: 'У вас недостаточно прав',
			res: null,
		};
	}

	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
