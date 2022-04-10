import { getSession } from "next-auth/react"

const sess = async (req, res) => {
    const session = await getSession({ req })
    res.send(JSON.stringify(session, null, 2))
}

export default sess;
