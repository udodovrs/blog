import propTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NewComment } from './new-comment';
import { server } from '../../../bff';
import { onDelete } from '../../../components/modal/utils';
import { Icon } from '../../../components/icon/icon';
import { userSessionSelector, userSelector } from '../../../selectors';
import { checkAccess } from '../../../utils/check-access';
import { ROLE } from '../../../constants/role';
import styled from 'styled-components';

const Span = styled.span`
	font-size: 20px;
	margin-right: 10px;
`;
const Inline = styled(Icon)`
	display: inline;
	margin-right: 10px;
`;

const CommentsContainer = ({ className, postId }) => {
	const [dataComments, setDataComments] = useState(null);
	const [isUpdate, setIsUpdate] = useState(null);
	const session = useSelector(userSessionSelector);
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	const access = checkAccess(user.roleId, [ROLE.ADMIN, ROLE.MODERATOR]);

	useEffect(() => {
		server.fetchComments(postId).then(({ error, res }) => {
			setDataComments(res);
		});
	}, [postId, isUpdate]);

	return (
		<div className={className}>
			{dataComments ? (
				<>
					<NewComment
						setIsUpdate={setIsUpdate}
						isUpdate={isUpdate}
						postId={postId}
					/>
					{dataComments.map(({ id, user_login, published_at, content }) => (
						<div key={id}>
							<div className="login">
								<div>
									<Inline
										id={'fa-user'}
										color={'orange'}
										size={'30px'}
										cursor={'default'}
									/>
									<Span>{user_login}</Span>
								</div>
								<div>
									<Inline
										id={'fa-calendar'}
										size={'30px'}
										cursor={'default'}
									/>
									<Span>{published_at}</Span>
								</div>
								{access && (
									<Icon
										id={'fa-trash'}
										size={'30px'}
										onClick={() => {
											const utils = () => setIsUpdate(!isUpdate);
											onDelete(
												session,
												'fetchDeleteComment',
												id,
												'Удалить коментарий?',
												dispatch,
												utils,
											);
										}}
									/>
								)}
							</div>
							<div className="content">{content}</div>
						</div>
					))}
				</>
			) : (
				''
			)}
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin-top: 30px;
	margin-bottom: 30px;

	& .login {
		display: flex;
		border-bottom: 1px solid;
	}

	& .content {
		margin: 10px;
		font-size: 1.1em;
		background-color: #a3a3a329;
		padding: 10px;
		border-radius: 20px;
	}
`;

Comments.propTypes = {
	postId: propTypes.string,
};
