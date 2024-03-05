import React, { useState } from 'react';
import { Box, Tabs as MUITabs, Tab } from '@mui/material';

interface TabData {
	label: string;
	count?: number;
	page: () => JSX.Element;
}
interface TabsProp {
	data: TabData[];
}

interface TabPanelProp {
	children: React.ReactNode;
	value: number;
	index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProp) => {
	return <div hidden={value !== index}>{value === index && <Box>{children}</Box>}</div>;
};

const Tabs = ({ data }: TabsProp) => {
	const [value, setValue] = useState<number>(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<MUITabs
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
				{data &&
					data.map((tab, index: number) => {
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
										<span>{tab.label}</span>
										<span
											style={{
												display: index === 0 ? 'none' : 'block',
												padding: '4px 6px',
												backgroundColor: '#F6F6F6',
												borderRadius: '4px',
											}}
										>
											{tab.count}
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
			</MUITabs>
			{data.map((panels, index: number) => {
				const { page: Component } = panels;
				return (
					<TabPanel
						key={index}
						value={value}
						index={index}
					>
						<Component />
					</TabPanel>
				);
			})}
		</>
	);
};

export default Tabs;
