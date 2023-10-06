import { addComment, getSession } from '../api';
import { ROLE } from '../constants/role';
import { getDateNow } from '../utils';

export const fetchAddComment = async (userSession, postId, login, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];
	const session = await getSession(userSession);
	const access = accessRoles.includes(session?.role_id);

	if (!session && !access) {
		return {
			error: 'У вас недостаточно прав',
			res: null,
		};
	}

	await addComment(postId, login, content, getDateNow);

	return {
		error: null,
		res: 'Коментарий добавлен',
	};
};
