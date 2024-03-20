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
		department: [String]
		members: [String]
	}

	input InitiativeTab {
		status: String
	}

	type InitiativesPagination {
		items: [Post]!
		count: Int!
		currentPage: Int!
	}

	type Comment {
		id: ID
		initiativeID: ID!
		author: Int!
		comment: String!
		created_date: DateTime!
		updated_date: DateTime!
	}

	type Post {
		id: ID
		title: String!
		post: String!
		reason: String!
		created_by: String!
		members: [String]!
		created_date: DateTime!
		updated_date: DateTime!
		deleted: Boolean!
		status: Int!
	}

	type Department {
		id: ID!
		department: String!
	}

	type Status {
		id: ID!
		status: String!
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
		author: Int!
		comment: String!
	}

	type Query {
		initiatives(status: InitiativeTab): InitiativesPagination
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
