import { getDateNow } from '../utils';

export const addPost = (newTitile, newImgUrl, newContent) =>
	fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			title: newTitile,
			image_url: newImgUrl,
			content: newContent,
			published_at: getDateNow(),
		}),
	}).then((createdPost) => createdPost.json());
