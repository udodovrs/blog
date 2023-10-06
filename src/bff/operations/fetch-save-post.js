import { getSession, updatePost, addPost } from '../api';
import { ROLE } from '../constants/role';

export const fetchSavePost = async (
	userSession,
	postId,
	newTitile,
	newImgUrl,
	newContent,
) => {
	const accessRoles = [ROLE.ADMIN];
	const session = await getSession(userSession);
	const access = accessRoles.includes(session?.role_id);

	if (!session && !access) {
		return {
			error: 'У вас недостаточно прав',
			res: null,
		};
	}

	let update = null
	if(postId==='new_post'){
		update = await addPost(newTitile, newImgUrl, newContent);
	}else{
		update = await updatePost(postId, newTitile, newImgUrl, newContent);
	}



	return {
		error: null,
		res: update,
	};
};
