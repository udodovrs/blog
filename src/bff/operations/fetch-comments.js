import { getComments } from '../api';

export const fetchComments = async (postId) => {
	const comments = await getComments(postId);

	return {
		error: null,
		res: comments,
	};
};
