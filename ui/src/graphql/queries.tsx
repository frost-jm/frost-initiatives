import { gql } from '@apollo/client';

export const GET_INITIATIVES = gql`
	query Posts($filter: PostFilterInput, $pagination: PaginationInput) {
		posts(filter: $filter, pagination: $pagination) {
			items {
				id
				title
				post
				tags
				created_by
				created_date
				updated_date
				deleted
				explanation
			}
			count
			currentPage
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
