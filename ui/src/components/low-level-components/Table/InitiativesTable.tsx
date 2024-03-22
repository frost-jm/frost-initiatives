import { Box } from '@mui/material';

import { tableHeads, tableContents } from './dummyData';
import { useState } from 'react';
import { VoteTooltip, TableContentWTitle, TableContent, TableLabel, Avatar, ProgressBar, Buttons, ButtonType } from '@/components';

const InitiativesTable = () => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	return (
		<Box sx={{ borderRadius: '4px', maxWidth: '1040px' }}>
			<Box
				sx={{
					display: 'flex',
					gap: '32px',
					backgroundColor: 'var(--primary-color)',
					border: '1px solid #E9EDEE',
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
				{tableContents.map((tableContent, index) => (
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
							<TableContent>{tableContent.date}</TableContent>
						</Box>

						<Box sx={{ display: 'block', minWidth: '220px' }}>
							<TableContentWTitle title={tableContent.initiativeName}>{tableContent.initiativeDescription}</TableContentWTitle>
						</Box>
						<Box sx={{ minWidth: '140px' }}>
							<Avatar
								type='single'
								label={true}
								data={tableContent.pitcher}
							/>
						</Box>
						<Box sx={{ minWidth: '100px' }}>
							<TableContent>{tableContent.dept}</TableContent>
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
								count={tableContent.count}
								totalHeads={tableContent.totalHeads}
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
						{!tableContent.voted ? (
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
						)}
					</Box>
				))}
			</Box>
		</Box>
	);
};
export default InitiativesTable;
