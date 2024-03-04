import { useState } from 'react';
import { FormControl, ListItemText, MenuItem, OutlinedInput, Checkbox, Select, SelectChangeEvent } from '@mui/material';

const departments = ['Content', 'Design', 'Dev', 'Execom', 'Mancomm', 'Org-wide', 'PMO', 'TMG'];

const DepartmentDropdown = () => {
	const [department, setDepartment] = useState<string[]>([]);
	const [open, setOpen] = useState<boolean>(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleChange = (event: SelectChangeEvent<typeof department>) => {
		const {
			target: { value },
		} = event;
		setDepartment(typeof value === 'string' ? value.split(',') : value);
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
				multiple
				displayEmpty
				value={department}
				onClose={handleClose}
				onOpen={handleOpen}
				onChange={handleChange}
				input={<OutlinedInput />}
				renderValue={(selected) => {
					if (selected.length === 0) {
						return (
							<>
								<span className='placeholder'>Required</span>
								<span>*</span>
							</>
						);
					}

					return selected.join(', ');
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
					fontSize: '14px',
					color: 'var(--input-color)',
					background: '#F8FAFB',
					height: '40px',
					border: 'none',
					borderRadius: open ? '4px 4px 0 0' : '4px',
					fieldset: {
						display: 'none',
					},
					'> .MuiSelect-select': {
						padding: '12px 8px 12px 12px!important',
					},
					svg: {
						position: 'absolute',
						right: '8px',
					},
					'span:first-of-type': {
						opacity: '0.4',
					},
					'span:last-of-type': {
						color: '#FF0000',
					},
				}}
			>
				<MenuItem
					disabled
					value=''
					sx={{
						background: '#F8FAFB',
						color: 'var(--input-color)',
						padding: '12px 8px 12px 12px',
						height: '40px',
						fontFamily: 'Figtree-Medium',
						fontWeight: '500',
						fontSize: '14px',
						lineHeight: '14px',
						'&.Mui-disabled': {
							opacity: '1',
						},
						'&.Mui-disabled .placeholder': {
							opacity: '0.4',
						},
						'span:last-of-type': {
							color: '#FF0000',
						},
					}}
				>
					<span className='placeholder'>Required</span>
					<span>*</span>
				</MenuItem>
				{departments.map((dept) => (
					<MenuItem
						disableRipple
						key={dept}
						value={dept}
						sx={{
							color: 'var(--input-color)',
							padding: '12px 8px 12px 12px',
							height: '40px',
							justifyContent: 'space-between',
							'&:not(:last-of-type):not(.Mui-selected)': {
								borderBottom: '1px solid #E9EDEE',
							},
							'&:hover, &.Mui-selected, &.Mui-selected:hover': {
								background: '#F8FAFB!important',
							},
						}}
					>
						<ListItemText
							primary={dept}
							sx={{
								all: 'unset',
								span: {
									fontFamily: 'Figtree-Medium',
									fontWeight: '500',
									fontSize: '14px',
									lineHeight: '14px',
									opacity: '0.8',
								},
							}}
						/>
						<Checkbox
							disableRipple
							checked={department.indexOf(dept) > -1}
							icon={<CheckMarkDefault />}
							checkedIcon={<CheckMark />}
							sx={{
								color: '#D6DAE0',

								'&.Mui-checked': {
									color: '#576BCD',
								},
							}}
						/>
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

const CheckMark = () => {
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<rect
				width='16'
				height='16'
				rx='4'
				fill='#576BCD'
			/>
			<path
				d='M5 8L7 10L11 6'
				stroke='white'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

const CheckMarkDefault = () => {
	return (
		<svg
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<rect
				x='1'
				y='1'
				width='14'
				height='14'
				rx='3'
				stroke='#D6DAE0'
				strokeWidth='2'
			/>
		</svg>
	);
};

export default DepartmentDropdown;
