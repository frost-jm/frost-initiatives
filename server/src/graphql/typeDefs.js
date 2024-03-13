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
	}

	input InitiativeStatus {
		status: String
		department:[String]
	}

	type InitiativesPagination {
		items: [Post]!
		count: Int!
		currentPage: Int!
	}

	type Post {
		id: ID
		title: String!
		reason: String!
		post: String!
		tags: [String!]!
		created_by: String!
		created_date: DateTime!
		updated_date: DateTime!
		deleted: Boolean!
		status: Int!
	}

	type Query {
		initiatives(status: InitiativeStatus):InitiativesPagination
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

