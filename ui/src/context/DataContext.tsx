import { createContext, useState, useContext, ReactNode } from 'react';

interface DataContextProps {
	mode: string;
	setMode: React.Dispatch<React.SetStateAction<string>>;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	submitting: boolean;
	setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	department: string[];
	setDepartment: React.Dispatch<React.SetStateAction<string[]>>;
	// to change
	formData: any;
	setFormData: any;
	disabled: boolean;
	setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
	children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
	const [mode, setMode] = useState('view');

	const [modalOpen, setModalOpen] = useState(false);

	const [submitting, setSubmitting] = useState(false);
	const [page, setPage] = useState(1);

	// department dropdown
	const [department, setDepartment] = useState<string[]>([]);

	// form state

	const [formData, setFormData] = useState({
		postId: '',
		title: '',
		post: '',
		reason: '',
		department: [],
		members: '',
		status: '',
		created_by: '',
		updated_at: '',
	});

	// submit button

	const [disabled, setDisabled] = useState<boolean>(true);

	return (
		<DataContext.Provider
			value={{
				mode,
				setMode,
				modalOpen,
				setModalOpen,
				submitting,
				setSubmitting,
				page,
				setPage,
				department,
				setDepartment,
				formData,
				setFormData,
				disabled,
				setDisabled,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useMode = (): DataContextProps => {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error('useMode must be used within a DataProvider');
	}
	return context;
};
