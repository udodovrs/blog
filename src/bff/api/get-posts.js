import { LIMIT_PAGINATION } from '../../constants/limit-pagination';

export const getPosts = async (page, searchValue) =>
	fetch(`http://localhost:3005/posts?title_like=${searchValue}&_page=${page}&_limit=${LIMIT_PAGINATION}`)
		.then((res) => Promise.all([res.json(), res.headers.get('x-total-count')]))
		.then(([loadedPost, totalCount]) => ({ loadedPost, totalCount }));
