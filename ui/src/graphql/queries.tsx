import { gql } from '@apollo/client';

export const GET_INITIATIVES = gql`
	query Initiatives($status: InitiativeTab) {
		initiatives(status: $status) {
			items {
				created_by
				created_date
				deleted
				id
				members
				department
				post
				reason
				status
				summary
				title
				updated_date
			}
		}
	}
`;

export const GET_INITIATIVE_BY_ID = gql`
	query Initiative($initiativeId: ID!) {
		initiative(id: $initiativeId) {
			created_by
			created_date
			deleted
			id
			members
			post
			reason
			status
			summary
			title
			updated_date
		}
	}
`;

export const CREATE_INITIATIVE = gql`
	mutation Mutation($input: InitiativeInput) {
		createdInitiative(input: $input) {
			data
			message
			success
			error {
				code
				message
			}
		}
	}
`;

export const UPDATE_INITIATIVE = gql`
	mutation UpdateInitiative($updateInitiativeId: ID!, $input: InitiativeInput) {
		updateInitiative(id: $updateInitiativeId, input: $input) {
			data
			message
			success
			error {
				code
				message
			}
		}
	}
`;

export const DELETE_INITIATIVE = gql`
	mutation DeleteInitiative($deleteInitiativeId: ID!) {
		deleteInitiative(id: $deleteInitiativeId) {
			data
			message
			success
			error {
				code
				message
			}
		}
	}
`;

export const GET_DEPARTMENTS = gql`
	query {
		departments {
			department
			id
		}
	}
`;

export const GET_STATUS = gql`
	query {
		status {
			id
			status
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation AddComment($input: CommentInput!) {
		addComment(input: $input) {
			data
			message
			success
			error {
				code
				message
			}
		}
	}
`;

export const EDIT_COMMENT = gql`
	mutation EditComment($commentId: ID!, $newComment: String!) {
		editComment(commentID: $commentId, newComment: $newComment) {
			data
			message
			success
		}
	}
`;

export const DELETE_COMMENT = gql`
	mutation RemoveComment($commentId: ID!) {
		removeComment(commentID: $commentId) {
			data
			message
			success
		}
	}
`;

export const GET_COMMENTS = gql`
	query Comments($postId: ID!) {
		comments(postID: $postId) {
			author
			comment
			created_date
			id
			initiativeID
		}
	}
`;
