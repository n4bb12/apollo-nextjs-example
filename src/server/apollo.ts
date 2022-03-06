import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { ApolloServer } from "apollo-server-micro"
import { authorResolvers } from "./author/resolvers"
import { authorsTypeDefs } from "./author/typeDefs"
import { bookResolvers } from "./book/resolvers"
import { bookTypeDefs } from "./book/typeDefs"
import { sharedTypeDefs } from "./shared/typeDefs"

export function createApolloServer() {
  return new ApolloServer({
    typeDefs: [bookTypeDefs, authorsTypeDefs, sharedTypeDefs],
    resolvers: [bookResolvers, authorResolvers],
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  })
}
