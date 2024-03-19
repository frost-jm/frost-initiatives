/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Input as MInput } from '@mui/material';

import Editor from '../Editor/Editor';
import { Avatar, ButtonType, Buttons, DepartmentDropdown, Input } from '@/components';
import React, { useEffect, useState } from 'react';
import { formatDate } from '@/utils/formatDate';
import { useMode } from '@/context/DataContext';
import { useUser } from '@/context/userContext';

const Form = () => {
	const { department, formData, setFormData, setDisabled, disabled } = useMode();
	const { currentUser } = useUser();
	const [isFocus, setIsFocus] = useState<boolean>(false);

	// Handle  Mutation for creating post
	const handleSubmit = async () => {
		try {
			console.log('submit');
		} catch (error) {
			console.error('Error creating post:', error);
		}
	};

	const date = new Date();
	const currentDate = formatDate(date);

	useEffect(() => {
		setFormData((prevFormData: any) => ({
			...prevFormData,
			department: department,
			created_by: currentUser && currentUser.userId,
		}));
	}, [department]);

	useEffect(() => {
		// Checking fields value
		console.log('form data', formData);

		const requiredFields = ['title', 'post', 'reason', 'department'];

		const emptyFields = requiredFields.filter((field) => !formData[field] || (field === 'department' && formData[field].length === 0));

		if (emptyFields.length > 0 || formData.post.trim() === '<p><br></p>') {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [formData]);

	return (
		<>
			<Box
				sx={{
					padding: '0 58px',
					'@media screen and (max-width:767px)': {
						padding: '0 24px',
					},
				}}
			>
				<MInput
					placeholder='Untitled'
					onChange={(e) =>
						setFormData((prevFormData: any) => ({
							...prevFormData,
							title: e.target.value,
						}))
					}
					sx={{
						fontSize: '32px',
						lineHeight: '1.5',
						fontFamily: 'Figtree-Bold,sans-serif',
						width: '100%',
						boxSizing: 'border-box',
						input: {
							color: 'var(--input-color)',
							padding: '0',
							'&::placeholder': {
								color: 'var(--input-color)',
								opacity: '0.15',
							},
						},
						'&:before, &:after': {
							borderBottom: 'none!important',
						},
					}}
				/>
				<Box
					marginTop='16px'
					sx={{
						'.form-control > div': {
							display: 'flex',
							width: '100%',
							alignItems: 'center',
							height: '40px',
							gap: '8px',
							'&:not(:first-of-type)': {
								marginTop: '8px',
							},
						},

						'.form-label': {
							width: '100%',
							maxWidth: '180px',
							fontFamily: 'Figtree-Medium,sans-serif',
							fontSize: '14px',
							lineHeight: '1',
							color: 'rgba(29, 36, 79, 0.9)',
						},
					}}
				>
					<Box className='form-control'>
						<Box>
							<Box className='form-label'>Pitched by</Box>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									fontFamily: 'Figtree-Medium',
									fontSize: '12px',
									lineHeight: '1.5',
									color: 'rgba(29, 36, 79, 0.6)',
									gap: '8px',
								}}
							>
								<Avatar
									label={true}
									type='single'
									data={currentUser}
								/>
								<Box
									sx={{
										background: 'rgba(52, 58, 97, 0.2)',
										height: '18px',
										width: '1px',
									}}
								/>
								{currentDate}
							</Box>
						</Box>
						<Box>
							<Box className='form-label'>Why do we need this?</Box>
							<Input
								variant='normal'
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setFormData((prevFormData: any) => ({
										...prevFormData,
										reason: e.target.value,
									}));

									e.target.value.trim() === '' ? setIsFocus(false) : setIsFocus(true);
								}}
								value={formData.reason}
								name='reason'
								isFocused={isFocus}
							/>
						</Box>

						<Box>
							<Box className='form-label'>Relevant Departments</Box>
							<DepartmentDropdown />
						</Box>
					</Box>
					<Box
						marginTop='24px'
						sx={{
							'.ql-container': {
								height: '400px',
								fontSize: '16px',
								color: 'var(--input-color)',
							},
							'.ql-container.ql-snow': {
								border: 'none',
							},
							'.ql-toolbar.ql-snow': {
								border: 'unset',
								borderTop: '1px solid #E9EDEE',
								borderBottom: '1px solid #E9EDEE',
								padding: '12px 0 12px 58px',
								'@media screen and (max-width:767px)': {
									padding: '12px 0',
								},
							},
							'.ql-editor': {
								lineHeight: '1.5',
								padding: '24px 0',
								'&::-webkit-scrollbar': {
									display: 'none',
								},
								ol: {
									fontFamily: 'Figtree-Regular',
								},
							},
							'.ql-editor.ql-blank::before': {
								color: 'rgba(29, 36, 79, 0.2)',
								fontFamily: 'Figtree-Medium',
								fontSize: '16px',
								left: '0',
							},
							'.ql-snow.ql-toolbar button': {
								padding: '0',
								height: '100%',
								width: 'max-content',
								'&:not(:first-of-type)': {
									marginLeft: '4px',
								},
							},
							'.ql-toolbar.ql-snow .ql-formats': {
								marginRight: '4px',
							},
							'.ql-snow .ql-toolbar button svg': {
								display: 'unset',
								height: 'unset',
							},
						}}
					>
						<Editor />
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					borderTop: '1px solid rgba(233, 237, 238, 1)',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Box
					sx={{
						opacity: disabled ? '0.2' : '1',
						pointerEvents: disabled ? 'none' : 'auto',
						padding: '24px 58px 0 0',
						'@media screen and (max-width:767px)': {
							padding: '24px 24px 0',
						},
					}}
				>
					<Buttons
						type={ButtonType.Join}
						maxWidth='94px'
						borderRadius='63px'
						fontSize='16px'
						action={() => handleSubmit()}
					>
						Submit
					</Buttons>
				</Box>
			</Box>
		</>
	);
};

export default Form;
