import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const EXPIRES_IN = "7d";

export const signJwt = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyJwt = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
