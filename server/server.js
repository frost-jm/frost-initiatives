const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginCacheControl } = require('apollo-server-core');

require('dotenv').config();

const db = require('./src/config/database');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');

const { errorHandler } = require('./src/utils/error');

const app = express();

app.use(cors());

const server = new ApolloServer({
	cors: true,
	typeDefs,
	resolvers,
	cache: {
		max: 100,
		ttl: 3600,
	},
	plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 60 })],
	context: ({ req }) => {
		const user = req.headers.authorization ? true : false;

		if (!user) {
			throw new Error('Unauthorized Access');
		}

		return {
			db,
			user,
		};
	},
});

async function startServer() {
	await server.start();
	server.applyMiddleware({ app, path: '/graphql' });
}

app.use(express.json({ limit: '100mb' }), express.urlencoded({ extended: true, limit: '100mb' }));

app.use(errorHandler);

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the Initiatives API' });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log(`GraphQL server running at http://localhost:${PORT}/graphql`);
});

startServer();
