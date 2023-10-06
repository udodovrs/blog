import { modalOpen, modalClose } from '../../actions';
import { server } from '../../bff';

export const onDelete = (session, operation, id, text, dispatch, utils) => {
	dispatch(
		modalOpen({
			isOpen: true,
			content: text,
			onConfirm: () => {
				server[operation](session, id).then(({ error, res }) => {
					if (error) {
						console.error(error);
					}
					if (res) {
						utils();
						console.log(res);
						dispatch(modalClose);
					}
				});
			},
			onCancel: () => dispatch(modalClose),
		}),
	);
};
