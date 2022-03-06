import type { AppProps } from "next/app"
import { FC } from "react"
import "src/client/global.css"
import { Providers } from "src/client/Providers"

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default App
