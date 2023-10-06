import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	modalCancelSelector,
	modalConfirmSelector,
	modalContentSelector,
} from '../../selectors';

const ModalContainer = ({ className }) => {
	const content = useSelector(modalContentSelector);
	const onConfirm = useSelector(modalConfirmSelector);
	const onCansel = useSelector(modalCancelSelector);
	return (
		<div className={className}>
			<div className="wafer"> </div>
			<div className="modal">
				<h4>{content}</h4>
				<div>
					<button className="btn" onClick={onConfirm}>
						Да
					</button>
					<button onClick={onCansel}>Отмена</button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	& .wafer {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 70%);
		bottom: 0;
		top: 0;
		left: 0;
		z-index: 10;
		right: 0;
	}

	& .modal {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 400px;
		background: white;
		border: 1px solid #000000;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 20;
		margin: 0 auto;
		transform: translate(-50%, -50%);
		padding-bottom: 15px;
	}

	& .btn {
		margin: 10px;
	}
`;
