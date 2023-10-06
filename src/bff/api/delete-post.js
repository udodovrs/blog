export const deletePost = (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`, {
		method: 'DELETE'
	}).then((deletedPost) => deletedPost.json());
