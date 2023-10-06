export const getComments = async (postId) => {
	const url = postId
		? `http://localhost:3005/comments/?post_id=${postId}`
		: 'http://localhost:3005/comments';

	return fetch(url).then((res) => res.json());
};
