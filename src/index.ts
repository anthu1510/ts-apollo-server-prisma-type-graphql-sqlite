import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLScalarType } from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
import { buildSchema } from "type-graphql";
import { context,Context } from './graphql/context';
import { UserResolver } from "./graphql/user.resolvers";

async function bootstrap() {
  // Build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
    validate: { forbidUnknownValues: false }
  });

  // Create GraphQL server
  const server = new ApolloServer<Context>({ schema});
  // Start server
  const { url } = await startStandaloneServer(server, { 
    listen: { port: 4000 },
    context: async () => context
  });
  console.log(`GraphQL server ready at ${url}`);
}

bootstrap().catch(console.error);
