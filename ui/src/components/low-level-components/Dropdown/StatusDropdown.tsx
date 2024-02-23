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
	const [open, setOpen] = useState<boolean>(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

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
				onClose={handleClose}
				onOpen={handleOpen}
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
							borderRadius: ' 0 0 4px 4px',
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
				IconComponent={SelectIcon}
				sx={{
					fontFamily: 'Figtree-Medium',
					fontWeight: '500',
					fontSize: '12px',
					lineHeight: '18px',
					color: 'var(--input-color)',
					opacity: '0.8',
					background: '#F8FAFB',
					border: 'none',
					borderRadius: open ? '4px 4px 0 0' : '4px',
					fieldset: {
						display: 'none',
					},
					'> .MuiSelect-select': {
						padding: '11px 8px 11px 12px!important',
					},
					svg: {
						position: 'absolute',
						right: '8px',
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
							padding: '11px 8px 11px 12px',
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

const SelectIcon = () => {
	return (
		<svg
			width='14'
			height='14'
			viewBox='0 0 14 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M2 5L7 10L12 5H2Z'
				fill='#1D244F'
			/>
		</svg>
	);
};

export default StatusDropdown;
