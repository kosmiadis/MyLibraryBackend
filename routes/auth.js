import express from "express"
const authRouter = express.Router();
import { postLogin, postSignup, getUser, updateUser, getLogout } from '../controllers/auth.js';
import { checkAuth } from "../middleware/checkAuth.js";
import { validateUserLoginData, validateUserSignupData } from "../middleware/validateUserData.js";

authRouter.post('/login', validateUserLoginData, postLogin);
authRouter.get('/logout', getLogout);   
authRouter.get('/users/me', checkAuth, getUser);
authRouter.post('/signup', validateUserSignupData, postSignup);
authRouter.patch('/update/me', updateUser);


export default authRouter;