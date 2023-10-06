export const getSession = async (hash) =>
	fetch(`http://localhost:3005/session/?session=${hash}`)
		.then((res) => res.json())
		.then((loadedSession) => loadedSession[0]);
