/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Input as MInput } from '@mui/material';

import Editor from '../Editor/Editor';
import { Avatar, ButtonType, Buttons, DepartmentDropdown, Input } from '@/components';
import React, { useEffect, useState } from 'react';
import { formatDate } from '@/utils/helpers';
import { useMode, FormData } from '@/context/DataContext';
import { useUser } from '@/context/UserContext';
import { useMutation } from '@apollo/client';
import { CREATE_INITIATIVE, UPDATE_INITIATIVE } from '@/graphql/queries';
import Comments from './modules/Comments';

const Form = () => {
	const { department, formData, setFormData, setDisabled, disabled, selectedInitiative, mode, setModalOpen, setActionNotif, setMode, setActionMessage } = useMode();
	const { currentUser } = useUser();
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	// Handle  Mutation for creating post

	const [createPost] = useMutation(CREATE_INITIATIVE);
	const [updatePost] = useMutation(UPDATE_INITIATIVE);

	const isUpdate = mode === 'edit';

	const handleSubmit = async () => {
		try {
			if (formData) {
				const { created_by, department, post, reason, title } = formData;

				// Set loading and submitting state to true
				setLoading(true);

				const mutation = mode === 'create' ? createPost : updatePost;

				const variables = {
					updateInitiativeId: isUpdate ? formData.postId || undefined : undefined,
					input: {
						post,
						title,
						department,
						reason,
						...(isUpdate ? {} : { created_by: created_by }),
					},
				};

				const { data } = await mutation({
					variables,
				});

				const handleSuccess = () => {
					setActionNotif(true);
					setLoading(false);
					setMode('view');
					if (!isUpdate) {
						setTimeout(() => {
							setModalOpen(false);
						}, 1500);
					}
				};

				if (data.createdInitiative && data.createdInitiative.success) {
					setActionMessage(data.createdInitiative.message);
					handleSuccess();
				}

				if (data.updateInitiative && data.updateInitiative.success) {
					setActionMessage(data.updateInitiative.message);
					handleSuccess();
				}
			}
		} catch (error) {
			console.error('Error creating post:', error);
		}
	};

	const date = new Date();
	const currentDate = formatDate(date);

	useEffect(() => {
		if (selectedInitiative) {
			setFormData((prevFormData: FormData) => ({
				...prevFormData,
				postId: selectedInitiative.id,
				title: selectedInitiative.title,
				post: selectedInitiative.post,
				reason: selectedInitiative.reason,
				department: selectedInitiative.department,
				created_by: '',
				created_date: selectedInitiative.created_date,
			}));
		} else if (mode === 'create') {
			setFormData((prevFormData: FormData) => ({
				...prevFormData,
				department: department,
				//created_by: currentUser && parseInt(currentUser.userId),
				created_by: 42, // hard coded for testing
			}));
		} else {
			setFormData((prevFormData: FormData) => ({
				...prevFormData,
				department: department,
			}));
		}
	}, [selectedInitiative, department]);

	useEffect(() => {
		if (formData) {
			const requiredFields: (keyof FormData)[] = ['title', 'post', 'reason', 'department'];

			const emptyFields = requiredFields.filter((field) => {
				return field === 'department' ? !formData[field]?.length : !formData[field];
			});

			emptyFields.length > 0 || formData?.post?.trim() === '<p><br></p>' ? setDisabled(true) : setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [formData, setDisabled]);

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
					value={selectedInitiative?.title || formData?.title || ''}
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
									data={selectedInitiative ? selectedInitiative.created_by : currentUser}
								/>
								<Box
									sx={{
										background: 'rgba(52, 58, 97, 0.2)',
										height: '18px',
										width: '1px',
									}}
								/>
								{selectedInitiative ? formatDate(selectedInitiative.created_date) : currentDate}
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
								value={selectedInitiative?.reason || formData?.reason || ''}
								name='reason'
								isFocused={(mode === 'edit' || mode === 'view') && formData?.reason.trim() !== '' ? true : isFocus}
							/>
						</Box>

						<Box>
							<Box className='form-label'>Relevant Departments</Box>
							<DepartmentDropdown />
						</Box>
					</Box>
					<Box
						sx={{
							display: mode === 'view' ? 'flex' : 'block',
							gap: '24px',
							padding: mode === 'view' ? '40px 0' : '24px 0',
						}}
					>
						<Box
							sx={{
								minWidth: '560px',
								'.ql-container': {
									width: '100%',
									maxWidth: mode === 'view' ? '560px' : '100%',
									height: mode === 'view' ? 'auto' : '400px',
									fontSize: '16px',
									color: 'var(--input-color)',
								},
								'.ql-container.ql-snow': {
									border: 'none',
								},
								'.ql-toolbar.ql-snow': {
									display: mode === 'view' ? 'none' : 'block',
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
									padding: mode === 'view' ? '0' : '24px 0',
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
						{selectedInitiative || mode === 'view' ? (
							<Box
								sx={{
									display: mode === 'view' ? 'block' : 'none',
									width: '100%',
									maxWidth: '280px',
									ul: {
										padding: ' 0 0 0 24px',
										margin: '12px 0 16px 0',
										color: 'rgba(29,36,79,0.7)',
										fontFamily: 'Figtree-Regular,sans-serif',
										fontSize: '16px',
										lineHeight: '1.4',
										'li:not(:first-of-type)': {
											marginTop: '16px',
										},
									},
									'.preamble': {
										fontFamily: 'Figtree-Bold,sans-serif',
										fontSize: '12px',
										lineHeight: '1.5',
										color: 'rgba(29,36,79,0.3)',
										paddingLeft: '24px',
										'&.main': {
											fontSize: '14px',
											color: 'var(--input-color)',
										},
									},
								}}
							>
								<Box className='preamble main'>Summary</Box>
								<ul>
									<li>Ensure uniformity in style, tone, and format across all documentation, enhancing readability and professionalism. Save time and effort by providing a structured framework for creating various types of documents, from reports and proposals to guidelines and manuals.</li>
									<li>Ensure uniformity in style, tone, and format across all documentation, enhancing readability and professionalism. Save time and effort by providing a structured framework for creating various types of documents, from reports and proposals to guidelines and manuals.</li>
								</ul>
								<Box className='preamble'>Generated by ChatGPT</Box>
							</Box>
						) : null}
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					borderTop: '1px solid rgba(233, 237, 238, 1)',
					display: mode === 'view' ? 'none' : 'flex',
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
						loading={loading}
					>
						{isUpdate ? 'Update' : 'Submit'}
					</Buttons>
				</Box>
			</Box>
			<Comments />
		</>
	);
};

export default Form;
