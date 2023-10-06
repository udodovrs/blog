import propTypes from 'prop-types';
import { Icon } from '../../../components/icon/icon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostContainer = ({
	className,
	id,
	title,
	image_url,
	published_at,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={image_url} alt="img" className="img" />
				<div>
					<div className="title">{title}</div>
					<div className="wrapper-data-post">
						<div>{published_at}</div>
						<div className="wrapper-comments">
							<Icon
								id={'fa-commenting-o'}
								size={'20px'}
								cursor={'default'}
							/>
							<div className="count-comments">{commentsCount}</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const Post = styled(PostContainer)`
	width: 300px;
	border: 2px solid orange;
	box-shadow: 0px 1px 17px 0px black;
	transition: box-shadow 0.3s;

	&:hover {
		box-shadow: 0px 1px 17px 0px #8000fd;
	}

	& .title {
		text-align: center;
		font-weight: 600;
	}

	& .img {
		width: 300px;
		height: 170px;
	}

	& .wrapper-data-post {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 5px;
	}

	& .wrapper-comments {
		display: flex;
	}

	& .count-comments {
		margin-top: 4px;
		font-weight: 500;
	}
`;

Post.propTypes = {
	id: propTypes.string,
	title: propTypes.string,
	image_url: propTypes.string,
	published_at: propTypes.string,
	commentsCount: propTypes.number,
};
