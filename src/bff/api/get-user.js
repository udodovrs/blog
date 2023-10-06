export const getUser = async (findLogin) =>
	fetch(`http://localhost:3005/users/?login=${findLogin}`)
		.then((res) => res.json())
		.then((loadedUser) => loadedUser[0]);
