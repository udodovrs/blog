import propTypes from 'prop-types'

import styled from 'styled-components';

const ButtonContainer = ({ children, className, ...props }) => (
	<button className={className} {...props}>
		{children}
	</button>
);

export const Button = styled(ButtonContainer)`
	width: ${props => props.width ? props.width : '100%'};
	background: linear-gradient(180deg, #ff7f00 0%, #f7ad19 100%);
	font-size: 20px;
	font-weight: 500;
	border: 2px solid black;
	border-radius: 5px;
	transition: all 0.3s;
	padding: 5px;
	cursor: pointer;
	&:hover {
		background: linear-gradient(180deg, #ff7f00 0%, #f7ad19 30%);
	}
`;

Button.propTypes = {
	children: propTypes.node.isRequired
}
