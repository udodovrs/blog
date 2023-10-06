import { ACTION_TYPE } from '../actions';
import { ROLE } from '../constants/role';

const userPersisitState = JSON.parse(localStorage.getItem('wduser'));

const guestUserState = {
	session: null,
	id: null,
	login: null,
	roleId: ROLE.GUEST,
};

const initialUserState = userPersisitState ? userPersisitState : guestUserState;

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return guestUserState;
		default:
			return state;
	}
};
