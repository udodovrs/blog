import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from '../../../components/input/input-text';
import { sanitaseContent } from './utils/sanitase-content';
import { Icon } from '../../../components/icon/icon';
import { postSelector, userSessionSelector } from '../../../selectors';
import { onDelete } from '../../../components/modal/utils';
import { savePostAsync } from '../../../actions';
import styled from 'styled-components';

const ArticleFormContainer = ({ className, postId, isPosting }) => {
	const article = useSelector(postSelector);
	const session = useSelector(userSessionSelector);
	const dispatch = useDispatch();
	const titleRef = useRef(null);
	const imgRef = useRef(null);
	const contentRef = useRef(null);
	const navigate = useNavigate();

	const onSave = async () => {
		const newTitile = titleRef.current.value;
		const newImgUrl = imgRef.current.value;
		const newContent = sanitaseContent(contentRef.current.innerHTML);

		if (isPosting) {
			const moveTo = (id) => navigate(`/post/${id}`);
			dispatch(
				savePostAsync(
					session,
					'new_post',
					newTitile,
					newImgUrl,
					newContent,
					moveTo,
				),
			);
			return;
		}

		dispatch(savePostAsync(session, postId, newTitile, newImgUrl, newContent));
		navigate(`/post/${postId}`);
	};

	return (
		<div className={className}>
			<>
				{isPosting && <h3>Добавление новой статьи</h3>}
				<div className="panel">
					{!isPosting && (
						<>
							<Icon id={'fa-calendar'} size={'30px'} cursor={'default'} />
							<div>{article.published_at}</div>
						</>
					)}
					<Icon id={'fa-floppy-o'} size={'30px'} onClick={onSave} />
					{!isPosting && (
						<Icon
							id={'fa-trash'}
							size={'30px'}
							onClick={() => {
								const utils = () => navigate('/');
								onDelete(
									session,
									'fetchDeletePost',
									postId,
									'Удалить статью?',
									dispatch,
									utils,
								);
							}}
						/>
					)}
				</div>
				<p>Заголовок статьи</p>
				<InputText defaultValue={isPosting ? '' : article.title} ref={titleRef} />
				<p>Ссылка на изображение</p>
				<InputText
					defaultValue={isPosting ? '' : article.image_url}
					ref={imgRef}
				/>
				<p>Контент статьи</p>
				<div
					className="content"
					contentEditable={true}
					suppressContentEditableWarning={true}
					ref={contentRef}
				>
					{isPosting ? 'новый контент...' : article.content}
				</div>
			</>
		</div>
	);
};

export const ArticleForm = styled(ArticleFormContainer)`
	position: relative;
	& .panel {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 20px;
		gap: 10px;
	}
	& .content {
		border: 1px solid;
		padding: 5px;
		width: 100%;
		margin-bottom: 30px;
	}
`;

ArticleForm.propTypes = {
	postId: propTypes.string,
	isPosting: propTypes.object,
};
