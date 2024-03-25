const bcrypt = require("bcrypt")
import { Request, Response } from 'express';
import User from '../models/user'; 
import jwt, { Secret, SignCallback } from 'jsonwebtoken';

export default class UserController {
    async signUp(req: Request, res: Response) {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
      }
      try {
        const user = await User.findOne({ email });
  
        if (user) {
          return res.status(400).json({ message: 'This user already exists' });
        }
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
          
         
    const userToReturn = {
      _id: newUser._id,
      email: newUser.email,
      
    };


        res.status(200).json(userToReturn);
      } catch (err) {
        res.status(500).json({ message: 'Error in creating user', err });
      }
    }
  
    async signIn(req: Request, res: Response) {
      const { email, password } = req.body;
  
      try {
        const user = await User.findOne({ email });
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        const match = await bcrypt.compare(password, user.password);
  
        if (!match) {
          return res.status(401).json({ message: 'Incorrect password' });
        }
  
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          'harsh' as Secret,
          {
            expiresIn: 10000,
          },
          (err: Error | null, token: string | undefined) => {
            if (err) throw err;

            const userToReturn = {
              _id: user._id,
              email: user.email,
              
            };
            
            res.status(200).json({ message: 'User signed in successfully', token, userToReturn });
          }
        );
      } catch (err) {
        res.status(500).json({ message: 'Error in signing in', err });
      }
    }
  }
// export const signUp = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (!email ||!password) {
//     return res.status(400).json({ message: 'Please provide email and password' });
//   }
//   try {
//     const user = await User.findOne({ email });

//     if(user){
//         return res.status(400).json({ message: 'This user already exists' });
//     }
//     // Hash the password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();

//     res.json(newUser);
//   } catch (err) {
//     res.status(500).json({ message: 'Error in creating user', err });
//   }
// };


// export const signIn = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       const match = await bcrypt.compare(password, user.password);
  
//       if (!match) {
//         return res.status(401).json({ message: 'Incorrect password' });
//       }
      
//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };
  
//       jwt.sign(
//         payload,
//         'harsh' as Secret,
//         {
//           expiresIn: 10000,
//         },
//         (err: Error | null, token: string | undefined) => {
//           if (err) throw err;
//           res.json({ message: 'User signed in successfully', token, user });
//         }
//       );
//     } catch (err) {
//       res.status(500).json({ message: 'Error in signing in', err });
//     }
//   };
  



