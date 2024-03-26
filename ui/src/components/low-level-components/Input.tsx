import { useMode } from '@/context/DataContext';
import { UserData, useUser } from '@/context/UserContext';
import { Avatar, Input as MInput, Box } from '@mui/material';
import { getAvatarColor } from '@/utils/helpers';
interface InputProps {
	variant: 'normal' | 'comment';
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string | undefined;
	name?: string;
	isFocused?: boolean;
	currentAvatarUser?: UserData | null;
	handlePressEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	handleAddComment?: () => void;
}

const Input = ({ variant = 'normal', onChange, value, name, isFocused, currentAvatarUser, handlePressEnter, handleAddComment }: InputProps) => {
	const { mode } = useMode();
	const { hailstormUsers } = useUser();
	const commonStyles = {
		width: '100%',
		boxSizing: 'border-box',
		input: {
			color: 'var(--input-color)',
			padding: '0',
			'&::placeholder': {
				color: 'var(--input-color)',
				opacity: '0.40',
			},
		},
		'&:before, &:after': {
			borderBottom: 'none!important',
		},
	};

	const styles = () => {
		if (variant === 'comment') {
			return {
				fontFamily: 'Figtree-Regular',
				fontSize: '16px',
				lineHeight: '24px',
				background: 'transparent',
				padding: '16px 40px 16px',
				borderTop: '1px solid #E9EDEE',
				borderBottom: '1px solid #E9EDEE',
				...commonStyles,
			};
		} else {
			return {
				fontFamily: 'Figtree-Medium',
				fontSize: '14px',
				lineHeight: '14px',
				background: mode === 'view' ? 'transparent' : '#F8FAFB',
				padding: '12px',
				borderRadius: '4px',
				...commonStyles,
			};
		}
	};

	return (
		<Box
			position='relative'
			width='100%'
			sx={{
				'.Mui-disabled': {
					color: 'var(--input-color)',
					WebkitTextFillColor: 'unset!important',
				},
			}}
		>
			{variant === 'comment' && currentAvatarUser && (
				<>
					<Avatar
						sx={{
							width: 24,
							height: 24,
							fontFamily: 'Figtree-SemiBold,sans-serif',
							fontSize: '12px',
							lineHeight: '14.4px',
							background: getAvatarColor(hailstormUsers, currentAvatarUser.firstName, currentAvatarUser.lastName) ?? '#EA5825',
							position: 'absolute',
							top: '50%',
							transform: 'translateY(-50%)',
						}}
					>
						{currentAvatarUser?.firstName[0]}
					</Avatar>
					<MInput
						placeholder='Add a comment'
						autoComplete='off'
						sx={styles()}
						onChange={onChange}
						value={value}
						onKeyDown={handlePressEnter}
					/>
				</>
			)}
			{variant === 'normal' && (
				<MInput
					disabled={mode === 'view'}
					placeholder='Required'
					autoComplete='off'
					sx={styles()}
					onChange={onChange}
					value={value}
					name={name}
					endAdornment={!isFocused && <span style={{ color: 'red', position: 'absolute', left: '70px' }}>*</span>}
				/>
			)}
			{variant === 'comment' && value?.trim() !== '' && (
				<img
					src='./icons/comment-icon.svg'
					style={{
						position: 'absolute',
						top: '50%',
						transform: 'translateY(-50%)',
						right: '0',
						cursor: 'pointer',
					}}
					onClick={handleAddComment}
				/>
			)}
		</Box>
	);
};
export default Input;
