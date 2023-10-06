import { getSession, deleteSession } from '../api';

export const logout = async (hash) => {
	const { id } = await getSession(hash);
	await deleteSession(id);
};
