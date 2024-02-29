import { Input as MInput } from '@mui/material';

const Input = () => {
	return (
		<MInput
			autoComplete='off'
			placeholder='Required'
			sx={{
				fontFamily: 'Figtree-Medium',
				fontSize: '14px',
				lineHeight: '14px',
				borderRadius: '12px',
				padding: '12px',
				background: 'rgba(244, 247, 248, 0.6)',
				width: '100%',
				boxSizing: 'border-box',
				'&:before, &:after': {
					borderBottom: 'none!important',
				},
				input: {
					color: 'var(--input-color)',
					'&::placeholder': {
						color: 'var(--input-color)',
					},
				},
			}}
		/>
	);
};
export default Input;
