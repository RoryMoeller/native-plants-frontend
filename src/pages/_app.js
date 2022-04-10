import '../components/global.css'
import { SessionProvider } from "next-auth/react"

const App = function({
    Component,
    pageProps: {session, ...pageProps},
}){
    return (
        <SessionProvider session={session}>
            <Component {...pageProps}/>
        </SessionProvider>
    )
}

export default App;