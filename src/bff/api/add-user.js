export const addUser = (login, password, getDateNow) =>
	fetch('http://localhost:3005/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registred_at: getDateNow(),
			role_id: 2,
		}),
	}).then((createdUser) => createdUser.json());
