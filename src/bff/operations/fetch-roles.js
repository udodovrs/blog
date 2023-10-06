import { getRoles, getSession } from '../api';
import { ROLE } from '../constants/role';

export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];
	const session = await getSession(userSession);
	const access = accessRoles.includes(session?.role_id);

	if (!session && !access) {
		return {
			error: 'У вас недостаточно прав',
			res: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
