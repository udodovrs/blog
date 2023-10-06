import { useSelector } from 'react-redux';
import { server } from '../../bff/server';
import { Icon } from '../../components/icon/icon';
import { SelectAndSave } from './components/select-and-save';
import { userSessionSelector } from '../../selectors';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ROLE } from '../../constants/role';

const UsersContainer = ({ className }) => {
	const userSession = useSelector(userSessionSelector);
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [isUpdate, setIsUpdate] = useState(false);

	const [errorAccess, setErrorAccess] = useState(false);

	useEffect(() => {
		Promise.all([
			server.fetchRoles(userSession),
			server.fetchUsers(userSession),
		]).then(([resRoles, resUsers]) => {
			if (resRoles.error || resUsers.reUsers) {
				setErrorAccess(true);
				return;
			}
			setRoles(resRoles.res);
			setUsers(resUsers.res);
		});
	}, [userSession, isUpdate, errorAccess]);

	const handleDelete = (userId) => {
		server.fetchDeleteUser(userSession, userId).then(({ error, res }) => {
			if (error) {
				console.error(error);
			}
			console.log(res);
			setIsUpdate(!isUpdate);
		});
	};

	const filterRoles = roles.filter(({ id }) => id !== ROLE.GUEST);

	if (errorAccess) {
		return <Navigate to="/errorAccess" />;
	}

	return (
		<div className={className}>
			<h3>Пользователи</h3>
			<div>
				<div className="titleTable">
					<div>Логин</div>
					<div>Дата регистрации</div>
					<div>Роль</div>
				</div>
				{users.map(({ id, login, registred_at, role_id }) => (
					<div key={id} className="titleRow">
						<div className="userData">
							<div className="rowLogin">{login}</div>
							<div className="rowData">{registred_at}</div>
							<SelectAndSave
								roles={filterRoles}
								userRoleId={role_id}
								userId={id}
								userSession={userSession}
								isUpdate={isUpdate}
								setIsUpdate={setIsUpdate}
							/>
						</div>
						<Icon
							id={'fa-trash'}
							size={'25px'}
							onClick={() => handleDelete(id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
export const Users = styled(UsersContainer)`
	width: 800px;
	margin: 0 auto;
	text-align: center;

	& .titleTable {
		display: flex;
		justify-content: space-around;
		font-weight: 700;
		border-bottom: 2px solid black;
		padding: 10px;
	}
	& .titleRow {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid black;
		padding: 5px;
	}

	& .userData {
		display: flex;
		width: 750px;
		justify-content: space-between;
	}

 	& .rowData{
		width: 250px;
    margin-right: 40px;
	}

	& .rowLogin{
		width: 250px;
	}
	}
`;
