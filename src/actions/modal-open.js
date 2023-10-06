import { ACTION_TYPE } from './action-type';

export const modalOpen = (props) => ({
	type: ACTION_TYPE.MODAL_OPEN,
	payload: props,
});
