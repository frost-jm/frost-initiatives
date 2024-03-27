/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserData } from '@/context/UserContext';

// Date Format: Jan. 01, 2024
export function formatDate(date: Date): string {
	const _this = new Date(date);
	const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
	return _this.toLocaleDateString('en-US', options);
}

// Date Format:  01/01/24
export function formatDateToNum(input: Date): string {
	const date = new Date(input);
	return date
		.toLocaleDateString('en-US', {
			month: '2-digit',
			day: '2-digit',
			year: '2-digit',
		})
		.replace(/\//g, '-');
}
// Format time stamp to (Now, 5min ago, 1hr ago, March 10,2024)
export const formatTimestamp = (timestamp: Date): string => {
	const date = new Date(timestamp);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - date.getTime());
	const diffMinutes = Math.round(diffTime / (1000 * 60));
	const diffHours = Math.round(diffTime / (1000 * 60 * 60));

	if (diffMinutes < 1) {
		return 'Now';
	} else if (diffMinutes < 60) {
		return `${diffMinutes}min ago`;
	} else if (diffHours < 24) {
		return `${diffHours}hr ago`;
	} else {
		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	}
};

// Assign random color
export const getColorForUserId = (userId: number) => {
	const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#d35400', '#2c3e50', '#27ae60', '#c0392b'];

	const index = userId % colors.length;

	return colors[index];
};

// Get name from hailstorm
export const getNameForUserId = (data: any, userId: number | string) => {
	if (data && data.hailstormData) {
		const hsUser = data.hailstormData.find((hsUser: any) => parseInt(hsUser.userId) === userId);

		return hsUser ? { firstName: hsUser.firstName, lastName: hsUser.lastName } : { firstName: '', lastName: '' };
	}
	return { firstName: '', lastName: '' };
};

// Get email from hailstorm

export const getEmailOfUserId = (data: any, userId: number | string) => {
	if (data && data.hailstormData) {
		const hsUser = data.hailstormData.find((hsUser: any) => parseInt(hsUser.userId) === userId);

		return hsUser.email;
	}
};

// Get ID through name
export const getUserIdForName = (data: any, name: { firstName: string; lastName: string }) => {
	if (data && data.hailstormData) {
		const hsUser = data.hailstormData.find((hsUser: any) => hsUser.firstName === name.firstName && hsUser.lastName === name.lastName);

		return hsUser ? hsUser.userId : null;
	}
	return null;
};

// Get avatar color
export const getAvatarColor = (data: any, firstName: string, lastName: string): string | undefined => {
	const user = data?.find((user: UserData) => user.firstName === firstName && user.lastName === lastName);
	return user?.color;
};
