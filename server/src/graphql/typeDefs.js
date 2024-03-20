const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON
	scalar Int
	scalar DateTime

	input InitiativeCreate {
		title: String!
		post: String!
		created_by: Int!
		reason: String!
		summary: String!
		department: [String]!
		members: String!
	}

	input InitiativeUpdate {
		title: String
        post: String
        reason: String
        summary: String
        department: [String]
        members: String
	}

	input InitiativeTab {
		status: Int
	}

	type InitiativesPagination {
		items: [Initiative]!
	}

	type Initiative {
		id: ID
		title: String!
		post: String!
		reason: String!
		created_by: Int!
		members: String!
		created_date: DateTime!
		updated_date: DateTime!
		deleted: Boolean!
		status: Int!
		summary: String!
	}

	type Department {
		id: ID!
		department: String!
	}

	type Status {
		id: ID!
		status: Int!
	}

	type User {
		userId: String!
		bindname: String!
		email: String
		firstName: String
		lastName: String
		position: String
	}

	type Query {
		initiatives(status: InitiativeTab): InitiativesPagination
		initiative(id: ID!): Initiative
		departments: [Department]
		status: [Status]
		hailstormData: [User]
	}

	type Mutation {
		createdInitiative(input: InitiativeCreate): Message
		updateInitiative(id: ID!, input: InitiativeUpdate): Message
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
