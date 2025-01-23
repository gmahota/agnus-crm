import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "default-secret";

interface TokenPayload {
  id: number;
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    console.log(JWT_SECRET);
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Token verification error:", error.message);
    } else {
      console.error("Token verification error:", error);
    }
    return null;
  }
};


// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(user: { id: string }) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '5m',
  });
}

// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
function generateRefreshToken(user: { id: string }, jti: string) {
  return jwt.sign({
    userId: user.id,
    jti
  }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '8h',
  });
}

function generateTokens(user: { id: string }, jti: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateTokens
};


