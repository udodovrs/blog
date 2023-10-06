import { deletePost, getSession, getComments, deleteComment } from '../api';
import { ROLE } from '../constants/role';

export const fetchDeletePost = async (userSession, postId) => {
	const accessRoles = [ROLE.ADMIN];
	const session = await getSession(userSession);
	const access = accessRoles.includes(session?.role_id);

	if (!session && !access) {
		return {
			error: 'У вас недостаточно прав',
			res: null,
		};
	}

	 await deletePost(postId);

	 const comments = await getComments(postId);

	 comments.forEach(async({id}) => {
		await deleteComment(id);
	 });


	return {
		error: null,
		res: 'Статья успешно удалена',
	};
};
