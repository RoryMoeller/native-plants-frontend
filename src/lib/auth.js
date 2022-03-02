import { serialize } from 'cookie';

import USER from '../data/user';

const TOKEN = "abcd1234";

export const generateAuthToken = (username) => {
  return TOKEN;
};

export const credentialsAreValid = (username, password) => {
  if (USER.password === password) {
    return true;
  } else {
    return false;
  }
};

export const setAuthCookie = (res, token) => {
  res.setHeader("Set-Cookie", serialize("auth", token, {
    path: "/",
    httpOnly: true,
    // secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 8)
  }));
};

export const requireAuth = handler => (req, res) => {
  if (authTokenIsValid(req.cookies.auth)) {
    return handler(req, res);
  } else {
    res.status(401).send({ err: "Unauthorized" });
  }
};

const authTokenIsValid = (token) => {
  return token === TOKEN;
};
