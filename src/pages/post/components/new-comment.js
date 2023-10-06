import propTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { server } from '../../../bff';
import { Icon } from '../../../components/icon/icon';
import { ROLE } from '../../../constants/role';
import { checkAccess } from '../../../utils/check-access';
import { userLoginSelector, userSessionSelector, userSelector } from '../../../selectors';
import styled from 'styled-components';

const NewCommentContainer = ({ className, postId, setIsUpdate, isUpdate }) => {
	const [valueComment, setValueComment] = useState('');
	const session = useSelector(userSessionSelector);
	const login = useSelector(userLoginSelector);
	const user = useSelector(userSelector);

	const access = checkAccess(user.roleId, [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]);
	const handleClick = () => {
		if (valueComment === '') {
			return;
		}
		server
			.fetchAddComment(session, postId, login, valueComment)
			.then(({ error, res }) => {
				if (error) {
					console.error(error);
				}
				setIsUpdate(!isUpdate);
				setValueComment('');
			});
	};

	return (
		<div className={className}>
			{access && (
				<>
					<textarea
						className="textarea"
						value={valueComment}
						placeholder="Комментировать..."
						onChange={({ target }) => setValueComment(target.value)}
					/>
					<Icon
						id={'fa-paper-plane-o'}
						size={'30px'}
						onClick={handleClick}
						color={valueComment === '' ? '#ccc' : 'orange'}
					/>
				</>
			)}
		</div>
	);
};

export const NewComment = styled(NewCommentContainer)`
	display: flex;
	justify-content: center;
	margin-top: 30px;
	margin-bottom: 30px;
	& .textarea {
		width: 650px;
		height: 100px;
		font-size: 1.3em;
	}
`;

NewComment.propTypes = {
	postId: propTypes.string,
	setIsUpdate: propTypes.func,
	isUpdate: propTypes.bool,
};
