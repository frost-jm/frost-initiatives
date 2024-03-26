import { ActionDropdown, Avatar, Input } from '@/components';
import { useMode, FormData } from '@/context/DataContext';
import { useUser } from '@/context/UserContext';
import { Box, Input as MInput } from '@mui/material';
import { getEmailOfUserId } from '@/utils/helpers';
import { ADD_COMMENT, EDIT_COMMENT, GET_COMMENTS, GET_INITIATIVE_BY_ID } from '@/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

import { formatTimestamp, getNameForUserId } from '@/utils/helpers';
import { useEffect, useRef, useState } from 'react';

interface Comment {
	id: string;
	author: string;
	comment: string;
	created_date: Date;
	initiativeID: string;
}
const Comments = () => {
	const { mode, setFormData, formData, selectedInitiative, resetForm } = useMode();
	const { currentUser, hailstorm } = useUser();

	const { data, refetch } = useQuery(GET_COMMENTS, {
		variables: { postId: selectedInitiative?.id },
	});

	const { data: initiativeData } = useQuery(GET_INITIATIVE_BY_ID, {
		variables: { initiativeId: selectedInitiative?.id },
	});

	const [addComment] = useMutation(ADD_COMMENT);
	const [editComment] = useMutation(EDIT_COMMENT);

	const user = currentUser && currentUser?.userId;

	const [openedIndex, setOpenedIndex] = useState(-1);
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [comments, setComments] = useState<string[]>([]);
	const [editableIndex, setEditableIndex] = useState<number | null>(null);

	const handleAddComment = async () => {
		try {
			const mutation = addComment;

			const initiativePitcher = initiativeData.initiative.created_by;

			const variables = {
				input: {
					author: {
						email: getEmailOfUserId(hailstorm, initiativePitcher),
					},
					commentor: {
						id: user,
						comment: formData?.comment,
						name: currentUser?.firstName + ' ' + currentUser?.lastName,
						initials: currentUser?.firstName[0],
					},
					initiativeID: initiativeData.initiative.id,
					initiativeTitle: selectedInitiative?.title,
				},
			};

			const { data } = await mutation({
				variables,
			});

			if (data.addComment && data.addComment.success) {
				resetForm();
				refetch();
			}
		} catch (error) {
			console.error('Error adding comment:', error);
		}
	};

	const handleEditComment = (index: number, newValue: string) => {
		const updatedComments = [...comments];
		updatedComments[index] = newValue;
		setComments(updatedComments);
		setEditableIndex(index);
	};

	const handleEditClick = () => {
		setIsEditable(!isEditable);
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleAddComment();
		}

		if (event.key === 'Escape' && editableIndex !== null) {
			setComments((prevComments) => {
				const updatedComments = [...prevComments];
				updatedComments[editableIndex] = data.comments[editableIndex].comment;
				return updatedComments;
			});
			setEditableIndex(null);
			setIsEditable(false);
		}
	};

	const handleShowAction = (index: number) => {
		setOpenedIndex(index);
	};

	useEffect(() => {
		refetch();
	}, [data, refetch, openedIndex]);

	const commentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (commentRef.current && !commentRef.current.contains(event.target as Node)) {
				setOpenedIndex(-1);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<Box
			sx={{
				padding: '0 58px',
				display: mode === 'view' ? 'block' : 'none',
			}}
		>
			{data &&
				data.comments.map((comment: Comment, index: number) => {
					const getCommentorName = getNameForUserId(hailstorm, comment.author);
					const { firstName, lastName } = getCommentorName;
					const currentUser = user ? parseInt(user) : user;
					return (
						<>
							<Box
								key={index}
								sx={{
									borderTop: '1px solid #E9EDEE',
									padding: '16px 0 20px',
									position: 'relative',
									'.comment-kebab': {
										position: 'absolute',
										right: '0',
										top: '16px',
										cursor: 'pointer',
										display: comment.author === currentUser ? 'block' : 'none',
									},
								}}
							>
								<Box
									sx={{
										display: 'flex',
										gap: '8px',
										alignItems: 'center',
									}}
								>
									<Avatar
										type='single'
										data={getNameForUserId(hailstorm, comment.author)}
									/>
									<Box
										sx={{
											fontFamily: 'Figtree-Medium',
											fontSize: '12px',
											lineHeight: '1.5',
											display: 'flex',
											gap: '8px',
											alignItems: 'center',
										}}
									>
										<Box color='rgba(29,36,79,0.8)'>{firstName + ' ' + lastName}</Box>
										<Box color='rgba(29,36,79,0.5)'>{formatTimestamp(comment?.created_date)}</Box>
									</Box>
								</Box>
								<Box
									sx={{
										'.helper-text': {
											marginTop: '4px',
											fontSize: '10px',
											paddingLeft: '33px',
											span: {
												color: 'var(--input-color)',
												fontFamily: 'Figtree-SemiBold,sans-serif',
											},
										},
									}}
								>
									<MInput
										value={comments[index] !== undefined ? comments[index] : comment.comment}
										onChange={(event) => handleEditComment(index, event.target.value)}
										onKeyDown={handleKeyPress}
										name='update-comment'
										readOnly={!isEditable}
										autoComplete='off'
										autoFocus={isEditable}
										sx={{
											caretColor: isEditable ? 'initial' : 'transparent',
											position: 'relative',
											width: '100%',
											marginTop: '8px',
											paddingLeft: '33px',
											fontFamily: 'Figtree-Regular,sans-serif',
											fontSize: '16px',
											lineHeight: '1.5',
											color: 'rgba(29,36,79,0.9)',
											'::before': {
												all: 'unset',
											},
											'::after': {
												all: 'unset',
											},
										}}
									></MInput>
									{isEditable && index === editableIndex && (
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

									{isEditable && index === editableIndex && (
										<div className='helper-text'>
											Press "Esc" to <span>cancel</span>
										</div>
									)}
								</Box>

								<img
									className='comment-kebab'
									src='./icons/kebab.svg'
									alt='kebab'
									onClick={() => handleShowAction(index)}
								/>
								{openedIndex === index && (
									<Box
										ref={commentRef}
										sx={{
											position: 'absolute',
											zIndex: '3',
											width: 'max-content',
											right: '41px',
											top: '41px',
										}}
									>
										<ActionDropdown
											setIsOpen={() => setOpenedIndex(-1)}
											type='comment'
											commentData={comment}
											onEdit={handleEditClick}
										/>
									</Box>
								)}
							</Box>
						</>
					);
				})}

			<Input
				variant='comment'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setFormData((prevFormData: FormData) => ({
						...prevFormData,
						comment: e.target.value,
					}));
				}}
				value={formData?.comment}
				name='comment'
				currentAvatarUser={currentUser && currentUser}
				handlePressEnter={handleKeyPress}
				handleAddComment={handleAddComment}
			/>
		</Box>
	);
};

export default Comments;
