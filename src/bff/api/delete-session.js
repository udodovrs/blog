export const deleteSession = (sessionId) =>
	fetch(`http://localhost:3005/session/${sessionId}`, {
		method: 'DELETE'
	}).then((res) => res.json());

