import {User} from "../../Store/Model/User";
import jwt from "jsonwebtoken";

const decodeJWT = (user: string): User => {
  return (jwt.verify(user, "Test")as {user: User}).user
}
export default decodeJWT;
