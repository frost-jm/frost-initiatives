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
