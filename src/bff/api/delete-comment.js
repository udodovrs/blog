export const deleteComment = (commentId) =>
	fetch(`http://localhost:3005/comments/${commentId}`, {
		method: 'DELETE'
	}).then((createdUser) => createdUser.json());
