export const sanitaseContent = (content) =>
	content
		.replaceAll('&nbsp;', '\n')
		.replace(/ +/, ' ')
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '');
