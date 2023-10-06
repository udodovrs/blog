export const addSeesion = (hash, role_id) =>
	fetch('http://localhost:3005/session', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			hash,
			role_id,
		}),
	}).then((createdComment) => createdComment.json());
