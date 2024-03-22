/* eslint-disable @typescript-eslint/no-explicit-any */

// Date Format: Jan. 01, 2024
export function formatDate(date: Date): string {
	const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
	return date.toLocaleDateString('en-US', options);
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

// Assign random color
export const getColorForUserId = (userId: number) => {
	const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#d35400', '#2c3e50', '#27ae60', '#c0392b'];

	const index = userId % colors.length;

	return colors[index];
};

// Get name from hailstorm
export const getNameForUserId = (data: any, userId: number) => {
	if (data && data.hailstormData) {
		const hsUser = data.hailstormData.find((hsUser: any) => parseInt(hsUser.userId) === userId);

		return hsUser ? { firstName: hsUser.firstName, lastName: hsUser.lastName } : { firstName: '', lastName: '' };
	}
	return { firstName: '', lastName: '' };
};
