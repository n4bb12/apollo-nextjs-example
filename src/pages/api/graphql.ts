import { NextApiHandler } from "next"
import { appConfig } from "src/config"
import { createApolloServer } from "src/server/apollo"

const server = createApolloServer()
const startServer = server.start()

const handler: NextApiHandler = async (req, res) => {
  await startServer
  const handleRequest = server.createHandler({
    path: appConfig.server.graphqlPath,
  })
  await handleRequest(req, res)
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
