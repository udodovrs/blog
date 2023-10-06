import { useEffect, useRef, useState } from 'react';
import { server } from '../../bff';
import { Search } from './components/search';
import { Post } from './components/post';
import { Pagination } from './components/pagination';
import styled from 'styled-components';

const MianContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [totalCountPage, setTotalCountPage] = useState(null);
	const [isUpdate, setIsUpdate] = useState(true);
	const searchValue = useRef('');

	const updateSearch = (value) => (searchValue.current = value);

	useEffect(() => {
		server
			.fetchPosts(page, searchValue.current)
			.then(({ error, res, totalCount }) => {
				if (error) {
					console.error(error);
				}
				setPosts(res);
				setTotalCountPage(Number(totalCount));
			});
	}, [page, isUpdate]);

	return (
		<div className={className}>
			<Search
				updateSearch={updateSearch}
				setIsUpdate={setIsUpdate}
				isUpdate={isUpdate}
			/>
			{posts.length === 0 ? (
				<h3>Статьи не найдены</h3>
			) : (
				<div className="posts-area">
					{posts.map(
						({ id, title, image_url, published_at, commentsCount }) => (
							<Post
								key={id}
								id={id}
								title={title}
								image_url={image_url}
								published_at={published_at}
								commentsCount={commentsCount}
							/>
						),
					)}
				</div>
			)}

			{(posts.length >= 6 || totalCountPage >= 6) && (
				<Pagination
					page={page}
					setPage={setPage}
					totalCountPage={totalCountPage}
				/>
			)}
		</div>
	);
};



export const Main = styled(MianContainer)`
	display: flex;
	flex-direction: column;
	position: relative;

	& .posts-area {
		display: flex;
		flex-wrap: wrap;
		gap: 43px;
		margin: 0 auto;
		width: 1000px;
	}
`;
