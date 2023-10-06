import { server } from '../bff';
import { ACTION_TYPE } from './action-type';


export const savePostAsync =
	(session, postId, newTitile, newImgUrl, newContent, moveTo) => (dispatch) => {
		server
			.fetchSavePost(session, postId, newTitile, newImgUrl, newContent)
			.then(({ error, res }) => {
				dispatch({
					type: ACTION_TYPE.SET_POST,
					payload: res,
				});
				if(postId==='new_post' && !!res){
					moveTo(res.id)
				}
			});
	};
