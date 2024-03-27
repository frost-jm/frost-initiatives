/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { Box } from '@mui/material';

import { statusTableHeads } from './dummyData';
import { useEffect, useMemo, useState } from 'react';
import { VoteTooltip, TableContentWTitle, TableContent, TableLabel, Avatar, ProgressBar, Buttons, ButtonType } from '@/components';
import { GET_INITIATIVES, GET_STATUS, JOIN_INITIATIVE, LEAVE_INITIATIVE } from '@/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { formatDateToNum, getColorForUserId, getNameForUserId, getUserIdForName } from '@/utils/helpers';
import { useUser } from '@/context/UserContext';
import { useMode } from '@/context/DataContext';

interface Status {
	id: number;
	status: string;
}

interface ProcessPostData {
	id: string;
	title: string;
	reason: string;
	post: string;
	created_by: number | any;
	created_date: Date;
	updated_date: string;
	summary?: string;
	status: number;
	color: string;
	department: string;
	members: any;
}

export enum Type {
	forVoting = 'For Voting',
	forImplementation = 'For Implementation',
	inProgress = 'In Progress',
	implemented = 'Implemented',
	done = 'Done',
	archived = 'Archived',
}

const InitiativesTable = ({ type }: { type: Type }) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const { setModalOpen, setSelectedInitiative, setMode, mode } = useMode();
	const { hailstorm, currentUser } = useUser();
	const [render, setRender] = useState<boolean>(false);

	const { data: statusData } = useQuery(GET_STATUS);

	const matchingStatus = statusData?.status.find((s: Status) => s.status === type);

	const statusId = parseInt(matchingStatus?.id);

	const { loading, data, refetch } = useQuery(GET_INITIATIVES, {
		variables: {
			status: {
				status: statusId,
			},
			pagination: {
				limit: 5,
				page: 1,
			},
		},
	});

	const [joinInitiative] = useMutation(JOIN_INITIATIVE);
	const [leaveInitiative] = useMutation(LEAVE_INITIATIVE);

	const processedPosts = useMemo(() => {
		if (!loading && data) {
			return data.initiatives.items.map((post: ProcessPostData) => ({
				...post,
				created_by: getNameForUserId(hailstorm, post.created_by),
				color: getColorForUserId(post.created_by),
				members: post.members.split(',').map((memberId: string) => {
					//@ts-ignore
					const user = hailstorm.hailstormData.find((user: any) => user.userId === memberId.trim());

					if (user) {
						return {
							id: user.userId,
							firstName: user.firstName,
							lastName: user.lastName,
						};
					} else {
						return {
							id: memberId.trim(),
							firstName: 'blank',
							lastName: 'blank',
						};
					}
				}),
			}));
		}
	}, [loading, hailstorm, data]);

	const handleViewInitiative = (data: ProcessPostData) => {
		setMode('view');
		setModalOpen(true);
		setSelectedInitiative(data);
	};

	const handleJoinInitiative = async (initiativeId: string) => {
		try {
			await joinInitiative({
				variables: {
					input: {
						initiativeId: initiativeId,
						userId: currentUser?.userId,
					},
				},
			});

			setRender((prevRender) => !prevRender);
		} catch (error) {
			console.error('Error joining initiative:', error);
		}
	};

	const handleLeaveInitiative = async (initiativeId: string) => {
		try {
			await leaveInitiative({
				variables: {
					input: {
						initiativeId: initiativeId,
						userId: currentUser?.userId,
					},
				},
			});

			setRender((prevRender) => !prevRender);
		} catch (error) {
			console.error('Error leaving initiative:', error);
		}
	};

	useEffect(() => {
		refetch();
	}, [data, mode, refetch, type, render]);

	//@ts-ignore
	const tableHeads = statusTableHeads[statusId] || [];

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
					{tableHeads.map((tableHead: any, index: number) => (
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
						processedPosts.map((tableContent: ProcessPostData, index: number) => {
							const creatorId = getUserIdForName(hailstorm, tableContent.created_by);
							const member = tableContent.members[0].id;

							return (
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
									{(statusId === 2 || statusId === 3) && (
										<Box sx={{ minWidth: '120px' }}>
											<TableContent>
												<Avatar
													type={'table'}
													data={tableContent.members}
												/>
											</TableContent>
										</Box>
									)}

									<Box sx={{ minWidth: '100px' }}>
										<TableContent>{tableContent.department}</TableContent>
									</Box>
									{(statusId === 1 || statusId === 5) && (
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
									)}

									<Box
										sx={{
											display: 'flex',
											gap: '4px',
											justifyContent: 'flex-end',
											width: '100%',
										}}
									>
										{member === currentUser?.userId && (
											<Buttons
												type={ButtonType.Leave}
												action={() => handleLeaveInitiative(tableContent.id)}
											>
												Leave
											</Buttons>
										)}

										{creatorId !== currentUser?.userId && member !== currentUser?.userId && (
											<Buttons
												type={ButtonType.Join}
												action={() => handleJoinInitiative(tableContent.id)}
											>
												Join
											</Buttons>
										)}

										<Buttons
											type={ButtonType.View}
											action={() => handleViewInitiative(tableContent)}
										>
											View
										</Buttons>
									</Box>
								</Box>
							);
						})}
				</Box>
			</Box>
		</>
	);
};
export default InitiativesTable;
