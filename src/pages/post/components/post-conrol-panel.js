import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../components/icon/icon';
import { onDelete } from '../../../components/modal/utils';
import { useSelector, useDispatch } from 'react-redux';
import { userSessionSelector, userSelector } from '../../../selectors';
import { checkAccess } from '../../../utils/check-access';
import { ROLE } from '../../../constants/role';
import styled from 'styled-components';

const Span = styled.span`
	font-size: 20px;
`;
const Inline = styled(Icon)`
	display: inline;
	margin-right: 10px;
`;

const PostControlPanelContainer = ({ className, publishedAt, postId }) => {
	const navigate = useNavigate();
	const session = useSelector(userSessionSelector);
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	const access = checkAccess(user.roleId, [ROLE.ADMIN]);
	return (
		<div className={className}>
			<div className="postedAt">
				<Inline
					id={'fa-calendar-plus-o'}
					color={'red'}
					size={'30px'}
					cursor={'default'}
				/>
				<Span>{publishedAt}</Span>
			</div>
			{access && (
				<>
					<Icon
						id={'fa-pencil'}
						color={'green'}
						size={'30px'}
						margin={'0 30px 0 0'}
						onClick={() => {
							navigate(`/post/${postId}/edit`);
						}}
					/>
					<Icon
						id={'fa-trash'}
						size={'30px'}
						onClick={() => {
							const utils = () => navigate('/');
							onDelete(
								session,
								'fetchDeletePost',
								postId,
								'Удалить статью?',
								dispatch,
								utils,
							);
						}}
					/>
				</>
			)}
		</div>
	);
};

export const PostControlPanel = styled(PostControlPanelContainer)`
	display: flex;
	margin-left: 30px;
	margin-bottom: 50px;

	& .postedAt {
		margin-right: 30px;
	}
`;

PostControlPanel.propTypes = {
	postId: propTypes.string,
	publishedAt: propTypes.string,
};
