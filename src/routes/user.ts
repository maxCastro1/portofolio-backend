
const express = require('express')
const router = express.Router()
import UserController from '../controllers/user'; 

const userController = new UserController();
const {signIn,signUp } = userController

router.post('/signup',signUp );
router.post('/signin', signIn);

// router.post('/signup', signUp);
// router.post('/signin', signIn);


export default router;