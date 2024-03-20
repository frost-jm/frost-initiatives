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

export const CREATE_INITIATIVE = gql`
	mutation Mutation($input: InitiativeCreate) {
		createdInitiative(input: $input) {
			message
		}
	}
`

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
