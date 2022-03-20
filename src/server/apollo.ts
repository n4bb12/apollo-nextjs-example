import {
  ApolloGateway,
  GraphQLDataSourceProcessOptions,
  IntrospectAndCompose,
  RemoteGraphQLDataSource,
} from "@apollo/gateway"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { ApolloServer } from "apollo-server-micro"

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }: GraphQLDataSourceProcessOptions) {
    const headers = (context as any)?.req?.headers || {}
    for (const key in headers) {
      const value = headers[key]
      if (value) {
        request.http?.headers.set(key, String(value))
      }
    }
  }
}

export function createApolloServer() {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [{ name: "spring-boot", url: "http://localhost:8080/dgs" }],
    }),
    buildService({ name, url }) {
      return new AuthenticatedDataSource({ url })
    },
  })

  return new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
    gateway,
  })
}
