import styled from 'styled-components';

const ErrorAccessContainer = ({ className }) => (
	<div className={className}>
		<h3>Ошибка: У вас недостаточно доступа</h3>
	</div>
);

export const ErrorAccess = styled(ErrorAccessContainer)`
	text-align: center;
`;
