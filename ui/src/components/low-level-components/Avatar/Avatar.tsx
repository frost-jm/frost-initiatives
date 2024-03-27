/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useUser } from '@/context/UserContext';
import { Avatar as MUIAvatar, Box, Tooltip } from '@mui/material';
import { getAvatarColor } from '@/utils/helpers';
interface AvatarData {
	firstName: string;
	lastName: string;
	color?: string;
}

interface AvatarProps {
	type: 'single' | 'multiple' | 'table' | 'tooltip';
	label?: boolean;
	data: AvatarData[] | AvatarData | null | number;
}

const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#d35400', '#2c3e50', '#27ae60', '#c0392b'];

const Avatar = ({ type = 'single', label, data }: AvatarProps) => {
	const { hailstormUsers } = useUser();
	let singleUserData: AvatarData | null = null;
	//@ts-ignore
	!Array.isArray(data) ? (singleUserData = data) : null;

	return (
		<>
			{type === 'single' && singleUserData && (
				<Box
					sx={{
						display: label ? 'flex' : 'block',
						alignItems: 'center',
						fontFamily: 'Figtree-Medium, sans-serif',
						fontSize: '12px',
						lineHeight: '18px',
						gap: '8px',
						color: 'rgba(29, 36, 79, 0.8)',
						userSelect: 'none',
					}}
				>
					<MUIAvatar
						sx={{
							width: '24px',
							height: '24px',
							background: getAvatarColor(hailstormUsers, singleUserData.firstName, singleUserData.lastName) ?? 'green',
							fontFamily: 'Figtree-SemiBold, sans-serif',
							fontSize: '12px',
							lineHeight: '1',
						}}
					>
						{singleUserData.firstName[0]}
					</MUIAvatar>
					{label && <>{singleUserData.firstName + ' ' + singleUserData.lastName}</>}
				</Box>
			)}

			{type === 'multiple' && Array.isArray(data) && (
				<Box
					sx={{
						display: label ? 'grid' : 'flex',
						gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr));',
						gap: label ? '8px' : '2px',
					}}
				>
					{data &&
						data.map((avatar: { firstName: string; lastName: string }, index: number) => {
							const initials = avatar.firstName[0];
							const fullname = avatar.firstName + ' ' + avatar.lastName;

							const bgColor = getAvatarColor(hailstormUsers, avatar.firstName, avatar.lastName) ?? colors[index % colors.length];
							return (
								<Box
									key={index}
									sx={{
										display: label ? 'flex' : 'block',
										fontFamily: 'Figtree-Medium, sans-serif',
										fontSize: '12px',
										lineHeight: '18px',
										color: 'rgba(29, 36, 79, 0.8)',
										gap: '8px',
									}}
								>
									<MUIAvatar
										sx={{
											width: '24px',
											height: '24px',
											background: bgColor,
											fontFamily: 'Figtree-SemiBold, sans-serif',
											fontSize: '12px',
											lineHeight: '14.4px',
											color: '#ffffff',
										}}
									>
										{initials}
									</MUIAvatar>
									{label && <>{fullname}</>}
								</Box>
							);
						})}
				</Box>
			)}

			{type === 'table' && Array.isArray(data) && (
				<Box
					sx={{
						display: 'flex',
					}}
				>
					{data &&
						data.slice(0, 3).map((avatar, index) => {
							const nameChecker = avatar.firstName;
							const initials = avatar.firstName[0];
							const bgColor = getAvatarColor(hailstormUsers, avatar.firstName, avatar.lastName) ?? colors[index % colors.length];

							return nameChecker !== 'blank' ? (
								<MUIAvatar
									key={index}
									sx={{
										width: '22px',
										height: '22px',
										background: bgColor,
										fontFamily: 'Figtree-SemiBold, sans-serif',
										fontSize: '12px',
										lineHeight: '14.4px',
										color: '#ffffff',
										border: '1px solid #ffffff',
										marginLeft: '-6px',
									}}
								>
									{initials}
								</MUIAvatar>
							) : (
								<Box
									key={index}
									sx={{
										color: 'rgba(29, 36, 79, 0.8)',
									}}
								>
									-
								</Box>
							);
						})}
					{data && data.length > 3 && (
						<MUIAvatar
							sx={{
								width: '22px',
								height: '22px',
								background: 'grey',
								fontFamily: 'Figtree-SemiBold, sans-serif',
								fontSize: '12px',
								lineHeight: '14.4px',
								color: '#ffffff',
								border: '1px solid #ffffff',
								marginLeft: '-4px',
							}}
						>
							...
						</MUIAvatar>
					)}
				</Box>
			)}
			{type === 'tooltip' && Array.isArray(data) && (
				<Box
					sx={{
						display: 'flex',
					}}
				>
					{data &&
						data.slice(0, 14).map((avatar, index) => {
							const name = avatar.firstName + ' ' + avatar.lastName;
							const initials = avatar.firstName[0];
							const bgColor = colors[index % colors.length];

							return (
								<Tooltip
									title={name}
									key={index}
								>
									<MUIAvatar
										sx={{
											width: '22px',
											height: '22px',
											background: bgColor,
											fontFamily: 'Figtree-SemiBold, sans-serif',
											fontSize: '12px',
											lineHeight: '14.4px',
											color: '#ffffff',
											border: '1px solid #ffffff',
											'&:not(:first-of-type)': {
												marginLeft: '-6px',
											},
										}}
									>
										{initials}
									</MUIAvatar>
								</Tooltip>
							);
						})}

					{data && data.length > 14 && (
						<Tooltip
							title={data
								.slice(14)
								.map((avatar) => avatar.firstName + ' ' + avatar.lastName)
								.join(', ')}
						>
							<MUIAvatar
								sx={{
									width: '22px',
									height: '22px',
									background: 'grey',
									fontFamily: 'Figtree-SemiBold, sans-serif',
									fontSize: '12px',
									lineHeight: '14.4px',
									color: '#ffffff',
									border: '1px solid #ffffff',
									marginLeft: '-4px',
								}}
							>
								...
							</MUIAvatar>
						</Tooltip>
					)}
				</Box>
			)}
		</>
	);
};

export default Avatar;
