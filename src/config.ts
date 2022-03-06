export const appConfig = {
  server: {
    port: +(process.env.PORT || 3000),
    graphqlPath: "/api/graphql",
  },
}
