export const getPost = async (postId) =>
	fetch(`http://localhost:3005/posts/?id=${postId}`)
		.then((res) => res.json())
		.then((loadedUser) => loadedUser[0]);
