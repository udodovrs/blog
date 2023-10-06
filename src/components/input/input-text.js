import propTypes from 'prop-types';
import { forwardRef } from 'react';
import styled from 'styled-components';

const InputTextConteiner = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const InputText = styled(InputTextConteiner)`
	width: ${(props) => (props.width ? props.width : '100%')};
	margin-bottom: 10px;
	height: 25px;
	padding: 5px;
	font-size: large;
`;

InputText.propTypes = {
	width: propTypes.string,
};
