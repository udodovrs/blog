import propTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { InputText } from '../../../components/input/input-text';
import { debounce } from '../utils';
import styled from 'styled-components';

const SearchContainer = ({ className, updateSearch, isUpdate, setIsUpdate }) => {
	const [value, setValue] = useState('');
	const startDelaySearch = useMemo(() => debounce(setIsUpdate, 2000), [setIsUpdate]);

	return (
		<div className={className}>
			<InputText
				value={value}
				placeholder={'Поиск...'}
				onChange={({ target }) => {
					updateSearch(target.value);
					setValue(target.value);
					startDelaySearch(!isUpdate);
				}}
			/>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	width: 350px;
	margin: 0 auto;
	margin-top: 20px;
	margin-bottom: 20px;
`;

Search.propTypes = {
	updateSearch: propTypes.func,
	isUpdate: propTypes.bool,
	setIsUpdate: propTypes.func,
};
