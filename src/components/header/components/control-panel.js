import { Link } from 'react-router-dom';
import { Icon } from '../../icon/icon';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../button/button';
import { ROLE } from '../../../constants/role';
import { userSelector } from '../../../selectors/user-selector';
import { logout } from '../../../actions/logout';
import { checkAccess } from '../../../utils/check-access';
import { removeUserLocalstorage } from '../../../use-localstorage/remove-user-localstorage';
import styled from 'styled-components';

const BlokLink = styled(Link)`
	transition: all 0.5s;
	&:hover {
		filter: drop-shadow(0px 5px 20px white);
	}
`;

const Span = styled.span`
	font-size: 20px;
	font-weight: 700;
	margin-left: 3px;
	margin-right: 50px;
	color: white;
`;
const Div = styled.div`
	display: flex;
	position: relative;
	margin: 5px;
`;
const DivIcon = styled.div`
	display: flex;
	position: absolute;
	right: -3px;
	top: -10px;
	cursor: pointer;
	transition: all 0.5s;
	&:hover {
		filter: drop-shadow(0px 5px 20px white);
	}
`;

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const ControlPanelConteiner = ({ className }) => {
	const navigate = useNavigate();
	const user = useSelector(userSelector);
	const dispatch = useDispatch();

	const access = checkAccess(user.roleId, [ROLE.ADMIN]);

	return (
		<div className={className}>
			{user.roleId === ROLE.GUEST ? (
				<BlokLink to={'/login'}>
					<Button width={'130px'}>войти</Button>
				</BlokLink>
			) : (
				<Div>
					<Span>{user.login}</Span>
					<DivIcon
						onClick={() => {
							dispatch(logout(user.session));
							removeUserLocalstorage();
							navigate('/');
						}}
					>
						<Icon id={'fa-sign-out'} />
					</DivIcon>
				</Div>
			)}
			<RightAligned>
				<BlokLink onClick={() => navigate(-1)}>
					<Icon id={'fa-chevron-circle-left'} />
				</BlokLink>
				{access && (
					<>
						<BlokLink to={'/post'}>
							<Icon id={'fa-file-text-o'} />
						</BlokLink>
						<BlokLink to={'/users'}>
							<Icon id={'fa-user-circle'} />
						</BlokLink>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelConteiner)`
	margin-top: 10px;
	margin-right: 20px;
`;
