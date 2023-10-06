import propTypes from 'prop-types';
import { useState } from 'react';
import { server } from '../../../bff/server';
import { Icon } from '../../../components/icon/icon';
import styled from 'styled-components';

const SelectAndSaveContainer = ({
	className,
	roles,
	userRoleId,
	userId,
	userSession,
	isUpdate,
	setIsUpdate,
}) => {
	const [value, setValue] = useState(userRoleId);

	const handleClick = () => {
		if (Number(value) === userRoleId) {
			return;
		}

		server.setUserRole(userSession, userId, value).then(({ error, res }) => {
			if (error) {
				return;
			}
			console.log(res);
			setIsUpdate(!isUpdate);
		});
	};

	return (
		<div className={className}>
			<select value={value} onChange={({ target }) => setValue(target.value)}>
				{roles.map(({ id, name }) => (
					<option key={id} value={id}>
						{name}
					</option>
				))}
			</select>
			<Icon
				id={'fa-floppy-o'}
				size={'25px'}
				onClick={handleClick}
				color={Number(value) === Number(userRoleId) ? '#ccc' : 'black'}
			/>
		</div>
	);
};

export const SelectAndSave = styled(SelectAndSaveContainer)`
	display: flex;
`;


SelectAndSave.propTypes = {
	roles: propTypes.array,
	userRoleId: propTypes.string,
	userId: propTypes.string,
	userSession: propTypes.string,
	isUpdate: propTypes.bool,
	setIsUpdate: propTypes.func,
};
