import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Autorisation } from './pages/autorisition/autorization';
import { Registration } from './pages/registration/registration';
import { Main } from './pages/main/main';
import { Users } from './pages/users/users';
import { ErrorAccess } from './pages/error-access/error-access.js';
import { Post } from './pages/post/post';
import styled from 'styled-components';
import { Modal } from './components/modal/modal';
import { isModalSelector } from './selectors';

const Content = styled.div`
	padding-top: 100px;
	width: 1200px;
	background-color: #f2f1f2;
	margin: 0 auto;
	flex-grow: 1;
`;

const FlexBoxPaige = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100%;
`;

export const Blog = () => {
	const isModal = useSelector(isModalSelector);
	return (
		<FlexBoxPaige>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Autorisation />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:postId" element={<Post />} />
					<Route path="/post/:postId/edit" element={<Post />} />
					<Route path="/errorAccess" element={<ErrorAccess />} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</Content>
			<Footer />
			{isModal && <Modal />}
		</FlexBoxPaige>
	);
};
