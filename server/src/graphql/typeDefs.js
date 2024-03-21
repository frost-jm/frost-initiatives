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
		summary: String
		department: [String]!
	}

	input InitiativeUpdate {
		title: String
		post: String
		reason: String
		summary: String
	}

	input InitiativeTab {
		status: Int
	}

	type InitiativesPagination {
		items: [Initiative]!
	}

	type Comment {
		id: ID
		initiativeID: ID!
		author: Int!
		comment: String!
		created_date: DateTime!
		updated_date: DateTime!
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

	input CommentInput {
		initiativeID: ID!
		initiativeTitle: String!
		author: AuthorInput!
		commentor: CommentorInput!
	}

	input AuthorInput {
		id: Int!
		email: String!
	}

	input CommentorInput {
		comment: String!
		name: String!
		initials: String!
	}

	type Query {
		initiatives(status: InitiativeTab): InitiativesPagination
		initiative(id: ID!): Initiative
		departments: [Department]
		status: [Status]
		hailstormData: [User]
		commentID(commentID: ID!): Comment
		comments(postID: ID!): [Comment]!
	}

	type Mutation {
		createdInitiative(input: InitiativeCreate): Message
		addComment(input: CommentInput!): Message
		editComment(commentID: ID!, newComment: String!): Message
		removeComment(commentID: ID!): Message
		updateInitiative(id: ID!, input: InitiativeUpdate): Message
		deleteInitiative(id: ID!): Message
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
