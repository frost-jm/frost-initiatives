import { ChangeEvent, SetStateAction, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const TabPanel = ({ children, value, index }: any) => {
	return <div hidden={value !== index}>{value === index && <Box p={3}>{children}</Box>}</div>;
};

const EditorTabs = ({ tabLabels }: any) => {
	const [value, setValue] = useState(0);

	const handleChange = (event: any, newValue: SetStateAction<number>) => {
		setValue(newValue);
	};

	return (
		<>
			<Tabs
				value={value}
				onChange={handleChange}
				sx={{
					'.MuiTab-root': {
						minWidth: '40px',
						maxWidth: 'max-content',
					},
					'.MuiTabs-indicator': {
						display: 'none',
					},
				}}
			>
				{tabLabels.map((tabLabelsData: { label: string; count: number }, index: number) => {
					return (
						<Tab
							key={index}
							disableRipple
							label={
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: index === 0 ? '0' : '8px',
									}}
								>
									<span>{tabLabelsData.label}</span>
									<span
										style={{
											display: index === 0 ? 'none' : 'block',
											padding: '4px 6px',
											backgroundColor: '#F6F6F6',
											borderRadius: '4px',
										}}
									>
										{tabLabelsData.count}
									</span>
								</div>
							}
							sx={{
								display: 'flex',
								fontFamily: 'Figtree-SemiBold, sans-serif',
								fontWeight: '600',
								fontSize: '14px',
								lineHeight: '1',
								textTransform: 'capitalize',
								padding: '16px 12px 18px',
								color: 'var(--cyan-blue)',

								'&:focus': {
									backgroundColor: 'unset',
								},

								'&.Mui-selected': {
									color: 'var(--secondary-color)',
									fontFamily: 'Figtree-Bold, sans-serif',
									fontWeight: '700',
									position: 'relative',

									'&::after': {
										content: '""',
										position: 'absolute',
										display: 'block',
										width: '100%',
										height: '2px',
										bottom: '0',
										left: '0',
										backgroundColor: 'var(--secondary-color)',
									},
								},
							}}
						/>
					);
				})}
			</Tabs>
			{tabLabels.map((_: any, index: number) => (
				<TabPanel
					key={index}
					value={value}
					index={index}
				>
					Content for {index} here!
				</TabPanel>
			))}
		</>
	);
};

export default EditorTabs;
