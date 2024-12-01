import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
   // TODO: verify the token exists and add the user data to the request object
  // Retrieve the token from the "Authorization" header
  const authHeader = req.headers.authorization;

  // Check if the token is missing
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    const secretKey = process.env.JWT_SECRET || '';

  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Attach the decoded payload to the request object
    req.user = user as JwtPayload;
    return next();
  });
} else {
  res.sendStatus(401); // Unauthorized
}
};


