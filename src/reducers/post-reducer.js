import { ACTION_TYPE } from '../actions/action-type';

const initialPostState = {
	id: '',
	post_id: '',
	content: '',
	user_login: '',
	published_at: '',
};

export const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
