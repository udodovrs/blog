export const updatePost = (postId, newTitile, newImgUrl, newContent) =>
	fetch(`http://localhost:3005/posts/${postId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			title: newTitile,
			image_url: newImgUrl,
			content: newContent,
		}),
	}).then((updatePost) => updatePost.json());
