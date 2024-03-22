/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { Box, Pagination } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { SetStateAction, useState } from 'react';

interface PostListData {
	totalPages?: number | undefined;
	currentPage?: number;
	handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControl = ({ totalPages }: PostListData) => {
	const [page, setPage] = useState(1);
	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.down('md'));

	const prevArrow = '.MuiPagination-ul > li:first-of-type > .MuiPaginationItem-previousNext:before ';
	const prevArrowText = '.MuiPagination-ul > li:first-of-type > .MuiPaginationItem-previousNext:after';

	const nextArrow = '.MuiPagination-ul > li:last-of-type > .MuiPaginationItem-previousNext:after';
	const nextArrowText = '.MuiPagination-ul > li:last-of-type > .MuiPaginationItem-previousNext:before';

	const paginationArrows = `${prevArrow}, ${nextArrow}`;
	const paginationArrowsText = `${prevArrowText}, ${nextArrowText}`;

	const PaginationCustomWrap = styled.div<PostListData>`
		@media screen and (max-width: 470px) {
			.MuiPagination-ul > li {
				width: auto;
			}

			.MuiPagination-ul {
				justify-content: center;
			}
			.MuiPaginationItem-previousNext {
				margin: 0;
				padding: 0;
			}

			${(props) => {
				if (props.totalPages && props.totalPages > 3) {
					return `
						.MuiPagination-ul > li:first-of-type {
							order: 2;
							flex-basis: 70%;
						}

						.MuiPagination-ul > li:last-of-type {
							order: 2;
							flex-basis: 30%;
							display: flex;
							justify-content: flex-end;
						}

						@media screen and (max-width: 460px) {
							.MuiPagination-ul {
							justify-content: center;
							}
						}
						`;
				}
			}}
		}
	`;

	const handleChange = (_event: any, page: SetStateAction<number>) => {
		setPage(page);
	};

	return (
		<PaginationCustomWrap totalPages={totalPages}>
			<Box
				width='100%'
				margin='24px auto 0'
				color='var(--input-color)'
				sx={{
					'.MuiPagination-ul > li:first-of-type': {
						marginRight: 'auto',
					},
					'.MuiPagination-ul > li:last-of-type': {
						marginLeft: 'auto',
					},
					'.MuiPaginationItem-previousNext': {
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: '6px',
					},
					'.MuiPaginationItem-previousNext > svg': {
						display: 'none',
					},

					' .MuiPaginationItem-page, .MuiPaginationItem-ellipsis': {
						color: 'var(--input-color)',
						fontSize: '16px',
						fontFamily: 'Figtree-SemiBold, sans-serif',
						lineHeight: '1.5',
						padding: '10px 12px 0 ',
						margin: '0',
						height: '48px',
					},
					'.Mui-disabled': {
						opacity: `0.4 !important`,
					},
					'.MuiButtonBase-root.MuiPaginationItem-root': {
						fontFamily: 'Figtree-SemiBold, sans-serif',
						fontWeight: '600',
						'&:hover': {
							background: 'transparent',
						},
					},
					[paginationArrows]: {
						content: 'url("./icons/pagination-arrow.svg")',
						display: 'block',
						width: '24px',
						height: '24px',
					},
					[prevArrow]: {
						transform: ' rotate(-180deg)',
					},
					[paginationArrowsText]: {
						display: 'block',
						height: '20px',
					},
					[prevArrowText]: {
						content: '"Previous"',
						fontFamily: 'Figtree-SemiBold, sans-serif',
						fontSize: '16px',
						lineHeight: '1.5',
						color: '#1D244F',
					},
					[nextArrowText]: {
						content: '"Next"',
						fontFamily: 'Figtree-SemiBold, sans-serif',
						fontSize: '16px',
						lineHeight: '1.5',
						color: '#1D244F',
					},
					'.Mui-selected': {
						// borderTop: '2px solid #576BCD',
						borderRadius: '0',
						background: 'transparent!important',
						color: '#576BCD!important',
						'&::before': {
							content: '""',
							background: '#576BCD',
							width: '100%',
							height: '2px',
							display: 'block',
							position: 'absolute',
							top: '-1px',
						},
					},
				}}
			>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handleChange}
					siblingCount={isTablet ? 0 : 1}
					boundaryCount={1}
					sx={{
						'> ul': {
							borderTop: '1px solid #E9EDEE',
							alignItems: 'flex-end',
							'li button': {
								width: '100%',
								'&.MuiPaginationItem-previousNext': {
									margin: '0',
									padding: '0',
								},
							},
						},
					}}
				/>
			</Box>
		</PaginationCustomWrap>
	);
};

export default PaginationControl;
