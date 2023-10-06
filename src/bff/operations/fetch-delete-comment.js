import { deleteComment, getSession } from '../api';
import { ROLE } from '../constants/role';

export const fetchDeleteComment = async (userSession, commentId) => {
	const accessRoles = [ROLE.ADMIN];
	const session = await getSession(userSession);
	const access = accessRoles.includes(session?.role_id);

	if (!session && !access) {
		return {
			error: 'У вас недостаточно прав',
			res: null,
		};
	}

	 await deleteComment(commentId);

	return {
		error: null,
		res: 'Комментарий успешно удален',
	};
};
