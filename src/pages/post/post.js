import { Article } from './components/article';
import { ArticleForm } from './post-form/article-form';
import { useParams, useMatch } from 'react-router-dom';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const { postId } = useParams();
	const isEditing = useMatch('/post/:postId/edit');
	const isPosting = useMatch('/post');
	return (
		<div className={className}>
			{isEditing || isPosting ? (
				<ArticleForm postId={postId} isPosting={isPosting}/>
			) : (
				<>
					<Article postId={postId} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	width: 1000px;
	margin: 0 auto;
`;
