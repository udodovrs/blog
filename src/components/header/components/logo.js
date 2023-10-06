import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-left: 20px;
	margin-top: 15px;
	filter: drop-shadow(0px 0px 15px #DCB3CB);
`;

const Webdev = styled.div`
    width: 190px;
    height: 40px;
    background: linear-gradient(180deg, #ff7f00 0%, #f7ad19 100%);
    border-radius: 10px 10px 0 0;
    text-align: center;
    font-size: 25px;
    padding: 4px;
    box-sizing: border-box;
    font-weight: bold;
}
`;

const Title = styled.div`
	background-color: black;
	color: whitesmoke;
	text-align: center;
	font-size: 15px;
	height: 28px;
	padding: 2px;
	border-radius: 0 0 10px 10px;
	width: 190px;
	box-sizing: border-box;
`;

export const Logo = () => (
	<Wrapper>
		<Link to={'/'}>
			<Webdev>&lt;WebDev /&gt;</Webdev>
			<Title>all about web development</Title>
		</Link>
	</Wrapper>
);
