import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "../../../api/resolvers";
import {readFile} from 'node:fs/promises'

const typeDefs = await readFile('./api/schema.graphql', "utf8")

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };