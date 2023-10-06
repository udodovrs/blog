import propTypes from 'prop-types';
import { LIMIT_PAGINATION } from '../../../constants/limit-pagination';
import { Icon } from '../../../components/icon/icon';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, setPage, totalCountPage }) => {
	return (
		<div className={className}>
			<Icon
				id={'fa-angle-double-left'}
				cursor={page === 1 ? 'default' : 'pointer'}
				color={page === 1 ? '#b3a1ab' : 'black'}
				onClick={() => {
					if (page === 1) {
						return;
					}
					setPage(1);
				}}
			/>
			<Icon
				id={'fa-angle-left'}
				color={page === 1 ? '#b3a1ab' : 'black'}
				cursor={page === 1 ? 'default' : 'pointer'}
				onClick={() => {
					if (page === 1) {
						return;
					}
					setPage(page - 1);
				}}
			/>
			<div className="page-count">{page}</div>
			<Icon
				id={'fa-angle-right'}
				color={page === Math.ceil(totalCountPage / LIMIT_PAGINATION) ? '#b3a1ab' : 'black'}
				cursor={
					page === Math.ceil(totalCountPage / LIMIT_PAGINATION) ? 'default' : 'pointer'
				}
				onClick={() => {
					if (page === Math.ceil(totalCountPage / LIMIT_PAGINATION)) {
						return;
					}
					setPage(page + 1);
				}}
			/>
			<Icon
				color={page === Math.ceil(totalCountPage / LIMIT_PAGINATION) ? '#b3a1ab' : 'black'}
				cursor={
					page === Math.ceil(totalCountPage / LIMIT_PAGINATION) ? 'default' : 'pointer'
				}
				id={'fa-angle-double-right'}
				onClick={() => {
					if (page === Math.ceil(totalCountPage / LIMIT_PAGINATION)) {
						return;
					}
					setPage(Math.ceil(totalCountPage / LIMIT_PAGINATION));
				}}
			/>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	gap: 10px;
	width: 200px;
	margin: 0 auto;
	align-items: baseline;
	margin-top: 30px;
	position: absolute;
	top: 632px;
	left: 500px;

	& .page-count {
		background-color: #a30ef396;
		border-radius: 50%;
		padding: 6px 10px 10px 10px;
		text-align: center;
		font-size: 30px;
		font-weight: 500;
		min-width: 40px;
	}
`;

Pagination.propTypes = {
	page: propTypes.number,
	totalCountPage: propTypes.number,
	setPage: propTypes.func,
};
