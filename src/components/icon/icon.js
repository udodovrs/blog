import propTypes from 'prop-types';
import styled from 'styled-components';

const IconConteiner = ({ className, id, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} arria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconConteiner)`
	font-size: ${({ size = '35px' }) => size};
	margin: ${({ margin = '0 6px' }) => margin};
	color: ${({ color = 'black' }) => color};
	cursor: ${({ cursor = 'pointer' }) => cursor};
`;

Icon.propTypes = {
	id: propTypes.string,
};
