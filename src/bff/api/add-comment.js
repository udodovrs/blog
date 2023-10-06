export const addComment = (postId, login, content, getDateNow) =>
	fetch('http://localhost:3005/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			post_id: postId,
     	content,
			user_login: login,
      published_at: getDateNow()
		}),
	}).then((createdComment) => createdComment.json());
