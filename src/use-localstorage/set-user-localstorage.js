import { store } from '../store';

export const setUserLocalstorage = () => {
	const user = JSON.stringify(store.getState().user);
	localStorage.setItem('wduser', user);
};
