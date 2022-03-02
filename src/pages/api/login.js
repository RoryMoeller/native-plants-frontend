import {
  generateAuthToken,
  credentialsAreValid,
  setAuthCookie
} from '../../lib/auth';

export default function (req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ err: "Only POST requests supported" })
  } else {
    const { username, password } = req.body;
    if (credentialsAreValid(username, password)) {
      setAuthCookie(res, generateAuthToken(username));
      res.status(200).send({ msg: "OK!" });
      // res.status(200).send({
      //   token: generateAuthToken(username)
      // })
    } else {
      res.status(401).send({ err: "Invalid credentials" })
    }
  }
}
