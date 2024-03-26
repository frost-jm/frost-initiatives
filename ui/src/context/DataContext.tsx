/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

export interface FormData {
	postId: string;
	title: string;
	post: string;
	reason: string;
	department: string[] | string;
	members: string;
	status: string;
	created_by: string | null | number;
	updated_at?: string;
	created_date: string | Date;
	comment: string;
}
interface InitiativesData {
	id: string;
	title: string;
	post: string;
	reason: string;
	created_by: number;
	created_date: Date;
	updated_date: string;
	summary?: string;
	status: number;
	department: string;
	members?: string[];
}

interface DataContextProps {
	mode: string;
	setMode: React.Dispatch<React.SetStateAction<string>>;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	department: string[];
	setDepartment: React.Dispatch<React.SetStateAction<string[]>>;
	formData: FormData | null;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	disabled: boolean;
	setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
	selectedInitiative: InitiativesData | null;
	setSelectedInitiative: React.Dispatch<React.SetStateAction<InitiativesData | null>>;
	resetForm: () => void;
	actionNotif: boolean;
	setActionNotif: React.Dispatch<React.SetStateAction<boolean>>;
	actionMessage: string | null;
	setActionMessage: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
	children: ReactNode;
}

const initialFormData: FormData = {
	postId: '',
	title: '',
	post: '',
	reason: '',
	department: [],
	members: '',
	status: '',
	created_by: '',
	created_date: '',
	updated_at: '',
	comment: '',
};

export const DataProvider = ({ children }: DataProviderProps) => {
	const [mode, setMode] = useState('view');
	const [selectedInitiative, setSelectedInitiative] = useState<InitiativesData | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [actionNotif, setActionNotif] = useState<boolean>(false);
	const [actionMessage, setActionMessage] = useState<string>('');

	const [page, setPage] = useState(1);

	// department dropdown
	const [department, setDepartment] = useState<string[]>([]);

	// form state

	const [formData, setFormData]: [FormData, Dispatch<SetStateAction<FormData>>] = useState(initialFormData);

	const resetForm = () => {
		setFormData({
			postId: '',
			title: '',
			post: '',
			reason: '',
			department: [],
			members: '',
			status: '',
			created_by: '',
			created_date: '',
			updated_at: '',
			comment: '',
		});
	};

	// submit button

	const [disabled, setDisabled] = useState<boolean>(true);

	return (
		<DataContext.Provider
			value={{
				mode,
				setMode,
				modalOpen,
				setModalOpen,
				page,
				setPage,
				department,
				setDepartment,
				formData,
				setFormData,
				disabled,
				setDisabled,
				selectedInitiative,
				setSelectedInitiative,
				resetForm,
				actionNotif,
				setActionNotif,
				actionMessage,
				setActionMessage,
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
