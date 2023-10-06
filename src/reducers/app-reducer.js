import { ACTION_TYPE } from '../actions';

const initialAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		content: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ACTION_TYPE.MODAL_OPEN:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
				},
			};
		case ACTION_TYPE.MODAL_CLOSE:
			return initialAppState;
		default:
			return state;
	}
};
