import { useEffect } from 'react'
import { useStore } from 'react-redux'

export const useResetForm = (reset)=>{
	const store = useStore();
	useEffect(() => {
		let curentWasLogout = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let prewWasLogout = curentWasLogout;
			curentWasLogout = store.getState().app.wasLogout;

			if (curentWasLogout !== prewWasLogout) {
				reset();
			}
		});
	}, [reset, store]);
}
