const { gql } = require('apollo-server-express');

module.exports = gql`
	scalar JSON
	scalar Int
	scalar DateTime

	input InitiativeInput {
		title: String!
		post: String!
		created_by: Int
		reason: String!
		summary: String
		department: [String]
	}

	input InitiativeTab {
		status: Int
	}

	input InitiativeMembers {
		initiativeId: ID!
		userId: String!
	}

	type InitiativesPagination {
		items: [Initiative]!
		pagination: PaginationData
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
		department: String
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

	type PaginationData {
		page: Int!
        total: Int!
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

	input PaginationInput {
		page: Int!
        limit: Int!
	}

	type Query {
		initiatives(status: InitiativeTab, pagination: PaginationInput): InitiativesPagination
		initiative(id: ID!): Initiative
		departments: [Department]
		status: [Status]
		hailstormData: [User]
		commentID(commentID: ID!): Comment
		comments(postID: ID!): [Comment]!
	}

	type Mutation {
		createdInitiative(input: InitiativeInput): Message
		addComment(input: CommentInput!): Message
		editComment(commentID: ID!, newComment: String!): Message
		removeComment(commentID: ID!): Message
		updateInitiative(id: ID!, input: InitiativeInput): Message
		deleteInitiative(id: ID!): Message
		joinInitiative(input: InitiativeMembers): Message
		leaveInitiative(input: InitiativeMembers): Message
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
