import { Icon } from '../../icon/icon';
import styled from 'styled-components';

const Name = styled.div`
	color: white;
	font-size: 20px;
	margin-left: 5px;
`;
const Span = styled.span`
	color: white;
	font-size: 15px;
`;
const Inline = styled(Icon)`
	display: inline;
`;

const ContactsConteiner = ({ className }) => (
	<div className={className}>
		<Name>Roman Udodov</Name>
		<Inline id={'fa-paper-plane'} color={'white'} size={'15px'} />
		<Span>telegram: @ruWindRes</Span>
		<div>
		<Inline id={'fa-envelope'} color={'white'} size={'15px'} />
		<Span>udodovrs@gmail.com</Span>
		</div>

	</div>
);

export const Contacts = styled(ContactsConteiner)`
	width: 220px;
	margin: 12px;
`;
