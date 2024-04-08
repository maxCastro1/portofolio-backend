const bcrypt = require("bcrypt")
import { Request, Response } from 'express';
import User from '../models/user'; 
import jwt, { Secret, SignCallback } from 'jsonwebtoken';
const nodemailer = require('nodemailer');

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
    async sendEmail(req: Request, res: Response) {
      const { name, email, message } = req.body;
     if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email and message' });
     }
      try {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'acount5177client@gmail.com', // replace with your email
            pass: 'vrqy otwo quwc yjly' // replace with your password
          }
        });
    
        let mailOptions = {
          from: email,
          to: 'acount5177client@gmail.com', // replace with your email
          subject: `Message from ${name}`,
          text: message
        };
    
        transporter.sendMail(mailOptions, (err:any, data:any) => {
          if (err) {
            return res.status(500).json({ message: 'Error in sending email', err });
          } else {
            return res.status(200).json({ message: 'Email sent successfully' });
          }
        });
      } catch (err) {
        res.status(500).json({ message: 'Error in sending email', err });
      }
    }
    
  }

  






  // const x = "vrqy otwo quwc yjly"