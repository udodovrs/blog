import { WeatherPlagin } from './weather plagin/weather-plagin';
import { Contacts } from './contacts/contacts';
import styled from 'styled-components';

const FooterConteiner = ({ className }) => {
	return (
		<div className={className}>
			<Contacts />
			<WeatherPlagin />
		</div>
	);
};

export const Footer = styled(FooterConteiner)`
	height: 100px;
	background-color: black;
	width: 1200px;
	margin: 0 auto;
	border-top: 4px solid orange;
	display: flex;
	justify-content: space-between;
`;
