import { getPosts, getComments } from '../api';

export const fetchPosts = async (page, searchValue) => {
	const { loadedPost, totalCount } = await getPosts(page, searchValue);
	const comments = await getComments();

	const mixin = loadedPost.map((item) => ({
		...item,
		commentsCount: comments.filter(({ post_id }) => post_id === item.id).length,
	}));

	return {
		error: null,
		res: mixin,
		totalCount,
	};
};
