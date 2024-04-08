import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user'; 

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const token = req.header('Authorization');



  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'harsh' as jwt.Secret) as JwtPayload;

    // Check if user exists
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // If user exists and token is valid, proceed to the route handler
    next();
  } catch (err) {

    res.status(401).json({ msg: 'Token is not valid' });
  }
};
