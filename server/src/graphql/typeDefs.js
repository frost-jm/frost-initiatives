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
		votes: Votes!
	}

	type Votes {
		voted: [Int]
		notVoted: [Int]
		maxVotes: Int
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
		getVotes(initativeID: ID!) : Message
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
		setVote(userID: ID!, initiativeID: ID!) : Message
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
