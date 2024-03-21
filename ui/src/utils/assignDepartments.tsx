interface UserData {
	userId: string;
	firstName: string;
	lastName: string;
	bindname: string;
	email: string;
	position: string;
	picture?: string;
	department?: string[];
}

type DepartmentToPositions = Record<string, string[]>;

export const departmentToPositions = {
	Content: ['Content Writer', 'Content Writer II', 'Mid-Level Content Writer', 'Content Director'],
	Dev: ['Technical Lead', 'Front End Developer', 'Front End Developer II', 'Mid-Level Front End Developer', 'Chief Creative'],
	Design: ['Chief Creative', 'Visual Designer I', 'Visual Designer II', 'Design Operations I', 'Mid-Level Visual Designer', 'Sr. Visual Designer'],
	PMO: ['Project Coordinator', 'Mid-level Project Manager'],
	TMG: ['Talent Acquisition and Development Partner', 'Talent Acquisition Specialist', 'Admin'],
	Execom: ['Independent Director', 'Chief Executive', 'Chief Creative'],
	Mancomm: ['Independent Director', 'Chief Executive', 'Chief Creative', 'Content Director', 'Technical Lead', 'Talent Acquisition and Development Partner'],
	OrgWide: [
		'Independent Director',
		'Chief Executive',
		'Chief Creative',
		'Content Director',
		'Technical Lead',
		'Talent Acquisition and Development Partner',
		'Content Writer',
		'Content Writer II',
		'Mid-Level Content Writer',
		'Front End Developer',
		'Front End Developer II',
		'Mid-Level Front End Developer',
		'Visual Designer I',
		'Visual Designer II',
		'Design Operations I',
		'Mid-Level Visual Designer',
		'Sr. Visual Designer',
		'Project Coordinator',
		'Mid-level Project Manager',
		'Talent Acquisition Specialist',
		'Admin',
	],
};

export const assignDepartments = (users: UserData[], departmentToPositions: DepartmentToPositions) => {
	return users.map((user) => {
		const departments: string[] = [];
		for (const [department, positions] of Object.entries(departmentToPositions)) {
			if (positions.some((position: string) => user.position.toLowerCase().includes(position.toLowerCase()))) {
				departments.push(department);
			}
		}
		return { ...user, departments };
	});
};
