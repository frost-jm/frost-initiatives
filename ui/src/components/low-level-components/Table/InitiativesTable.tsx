import { Box } from '@mui/material';

import { tableHeads } from './dummyData';
import { useEffect, useMemo, useState } from 'react';
import { VoteTooltip, TableContentWTitle, TableContent, TableLabel, Avatar, ProgressBar, Buttons, ButtonType } from '@/components';
import { GET_INITIATIVES } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { formatDateToNum, getColorForUserId, getNameForUserId } from '@/utils/helpers';
import { useUser } from '@/context/UserContext';
import { useMode } from '@/context/DataContext';

interface ProcessPostData {
	id: string;
	title: string;
	reason: string;
	created_by: number;
	created_date: Date;
	updated_date: string;
	summary?: string;
	status: number;
	color: string;
	department: string;
}

const InitiativesTable = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const { setModalOpen, setSelectedInitiative, setMode, mode } = useMode();
	const { hailstorm } = useUser();
	const { loading, data, refetch } = useQuery(GET_INITIATIVES, {
		variables: {
			status: {
				status: 1,
			},
		},
	});

	const processedPosts = useMemo(() => {
		if (!loading && data) {
			return data.initiatives.items.map((post: ProcessPostData) => ({
				...post,
				created_by: getNameForUserId(hailstorm, post.created_by),
				color: getColorForUserId(post.created_by),
			}));
		}

		return [];
	}, [loading, hailstorm, data]);

	const handleViewInitiative = (data: ProcessPostData) => {
		setMode('view');
		setModalOpen(true);
		setSelectedInitiative(data);
		console.log('data', data);
	};

	useEffect(() => {
		refetch();
	}, [data, mode, refetch]);

	return (
		<>
			<Box sx={{ borderRadius: '4px', maxWidth: '1040px' }}>
				<Box
					sx={{
						display: 'flex',
						gap: '32px',
						backgroundColor: 'var(--primary-color)',
						borderBottom: '1px solid #E9EDEE',
						borderRadius: '4px 4px 0 0',
						padding: '12px 24px',
						minWidth: '1040px',
						boxSizing: 'border-box',
					}}
				>
					{tableHeads.map((tableHead, index) => (
						<Box
							sx={{ minWidth: tableHead.width }}
							key={index}
						>
							<TableLabel label={tableHead.label} />
						</Box>
					))}
				</Box>

				<Box
					sx={{
						minWidth: '1040px',

						'> :last-of-type': {
							borderRadius: '0 0 4px 4px',
						},
					}}
				>
					{processedPosts &&
						processedPosts.map((tableContent: ProcessPostData, index: number) => (
							<Box
								key={index}
								sx={{
									backgroundColor: index % 2 !== 0 ? '#ffffff' : '#F7FAFC',
									display: 'flex',
									alignItems: 'flex-start',
									gap: '32px',
									padding: '12px 24px',
									position: 'relative',
								}}
							>
								<Box sx={{ minWidth: '68px' }}>
									<TableContent>{formatDateToNum(tableContent.created_date)}</TableContent>
								</Box>

								<Box sx={{ display: 'block', minWidth: '220px' }}>
									<TableContentWTitle title={tableContent.title}>{tableContent.reason}</TableContentWTitle>
								</Box>
								<Box sx={{ minWidth: '140px' }}>
									<Avatar
										type='single'
										label={true}
										data={tableContent.created_by}
									/>
								</Box>
								<Box sx={{ minWidth: '100px' }}>
									<TableContent>{tableContent.department}</TableContent>
								</Box>
								<Box
									sx={{ minWidth: '240px', margin: 'auto' }}
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									{hoveredIndex === index && (
										<Box sx={{ position: 'absolute', bottom: '95%', zIndex: '99' }}>
											<VoteTooltip />
										</Box>
									)}

									<ProgressBar
										count={0}
										totalHeads={28}
									/>
								</Box>
								{/* {!tableContent.joined && tableContent.voted && (
		          <Buttons
		            type={ButtonType.Join}
		            action={() => console.log('click')}
		          >
		            Join
		          </Buttons>
		        )}
		        {tableContent.joined && tableContent.voted && (
		          <Buttons
		            type={ButtonType.Leave}
		            action={() => console.log('click')}
		          >
		            Leave
		          </Buttons>
		        )} */}

								<Buttons
									type={ButtonType.View}
									action={() => handleViewInitiative(tableContent)}
								>
									View
								</Buttons>
								{/* {!tableContent.voted ? (
								<Buttons
									type={ButtonType.Join}
									action={() => console.log('click')}
								>
									Vote
								</Buttons>
							) : (
								<Buttons
									type={ButtonType.View}
									action={() => console.log('click')}
								>
									View
								</Buttons>
							)} */}
							</Box>
						))}
				</Box>
			</Box>
		</>
	);
};
export default InitiativesTable;
