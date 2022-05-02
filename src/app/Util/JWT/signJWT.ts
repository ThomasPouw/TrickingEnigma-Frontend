import jwt from 'jsonwebtoken';
import {User} from "../../Store/Model/User";
import decodeJWT from "./decodeJWT";
const signJWT = (user: User): any => {
  var timeSinceEpoch = new Date().getTime();
  var expirationTime = timeSinceEpoch + Number(100000/*config.server.token.expireTime*/) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
  return jwt.sign(
    {
      user: user
    },"Test",

    {
      algorithm: 'HS256',
      expiresIn: expirationTimeInSeconds
    }
  )
};

export default signJWT;
