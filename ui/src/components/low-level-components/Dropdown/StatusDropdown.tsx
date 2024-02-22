import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

interface Option {
	value: string;
	label: string;
	color: string;
}

const options: Option[] = [
	{ value: 'In Progress', label: 'In Progress', color: 'rgba(54, 185, 214, 1)' },
	{ value: 'For Implementation', label: 'For Implementation', color: 'rgba(246, 157, 74, 1)' },
	{ value: 'Done', label: 'Done', color: 'rgba(116, 208, 166, 1)' },
	{ value: 'Archived', label: 'Archived', color: 'rgba(215, 222, 226, 1)' },
];

const StatusDropdown = () => {
	const [selectedOptions, setSelectedOptions] = useState<string[]>(['In Progress']);

	const handleChange = (event: SelectChangeEvent<string | string[]>) => {
		const value = event.target.value;
		const newValue = typeof value === 'string' ? [value] : value;

		setSelectedOptions(newValue);
	};
	return (
		<FormControl
			fullWidth
			sx={{
				'.MuiList-root-MuiMenu-list': {
					padding: '0',
				},
				svg: {
					color: 'var(--input-color)',
				},
			}}
		>
			<Select
				displayEmpty
				value={selectedOptions}
				onChange={handleChange}
				renderValue={(selected) => {
					if (!Array.isArray(selected)) {
						selected = [selected];
					}

					return (
						<div>
							{selected.map((option) => {
								const selectedOption = options.find((o) => o.value === option);

								if (selectedOption) {
									return (
										<div key={option}>
											<div
												style={{
													backgroundColor: selectedOption.color,
													width: '8px',
													height: '8px',
													marginRight: '4px',
													borderRadius: '50%',
													display: 'inline-block',
												}}
												className='option-color'
											/>
											{option}
										</div>
									);
								}

								return null;
							})}
						</div>
					);
				}}
				MenuProps={{
					PaperProps: {
						style: {
							boxShadow: 'none',
						},
					},
					MenuListProps: {
						style: {
							padding: '0',
							border: '1px solid #F8FAFB',
							boxShadow: 'none',
						},
					},
				}}
				sx={{
					fontFamily: 'Figtree-Medium',
					fontWeight: '500',
					fontSize: '12px',
					lineHeight: '18px',
					color: 'var(--input-color)',
					background: 'rgba(244, 247, 248, 1)',
					border: 'none',
					fieldset: {
						display: 'none',
					},
				}}
			>
				{options.map((option) => (
					<MenuItem
						key={option.value}
						value={option.value}
						sx={{
							fontFamily: 'Figtree-Medium',
							fontWeight: '500',
							fontSize: '12px',
							lineHeight: '18px',
							color: 'var(--input-color)',
							padding: '12px 8px  12px 12px',
							background: 'var(--primary-color)',
							'&:not(:last-of-type):not(.Mui-selected)': {
								borderBottom: '1px solid #E9EDEE',
							},
							'&:hover, &.Mui-selected, &.Mui-selected:hover': {
								background: '#F8FAFB!important',
							},
						}}
					>
						<div
							style={{ backgroundColor: option.color, width: '8px', height: '8px', marginRight: '4px', borderRadius: '50%' }}
							className='option-color'
						/>

						{option.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default StatusDropdown;
