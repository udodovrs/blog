import { Logo } from './components/logo';
import { ControlPanel } from './components/control-panel';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	width: 1200px;
	margin: 0 auto;
	justify-content: space-between;
`;

const HeaderContqiner = ({ className }) => (
	<header className={className}>
		<Wrapper>
			<Logo />
			<ControlPanel />
		</Wrapper>
	</header>
);

export const Header = styled(HeaderContqiner)`
	height: 100px;
	background: linear-gradient(91deg, #bf2979 12.29%, #7e3cbf 81.65%);
	box-shadow: 0px 5px 5px 0px black;
	position: fixed;
	min-width: 100%;
	top: 0;
	box-sizing: border-box;
	z-index: 1;
`;
