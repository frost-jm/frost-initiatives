const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON
	scalar Int
	scalar DateTime

	input InitiativeCreate {
		title: String!
		post: String!
		created_by: String!
		reason: String!
		department:[String]
		members:[String]
	}

	input InitiativeTab {
		status: String
	}

	type InitiativesPagination {
		items: [Post]!
		count: Int!
		currentPage: Int!
	}

	type Post {
		id: ID
		title: String!
		post: String!
		reason: String!
		created_by: String!
		members:[String]!
		created_date: DateTime!
		updated_date: DateTime!
		deleted: Boolean!
		status: Int!
	}

	type Query {
		initiatives(status: InitiativeTab):InitiativesPagination
	}

	type Mutation {
		createdInitiative(input: InitiativeCreate): Message
	}

	type Message {
		data: JSON
		success: Boolean
		message: String
		error: Error
	}

	type Error {
		message: String!
		code: String
	}
`;

