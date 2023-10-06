import { server } from '../bff';
import { ACTION_TYPE } from './action-type';

export const setPostAsync = (postId) => (dispatch) => {
	server.fetchPost(postId).then(({ error, res }) => {
		dispatch({
			type: ACTION_TYPE.SET_POST,
			payload: res,
		});
	});
};
