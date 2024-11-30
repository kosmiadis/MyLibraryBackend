import express from "express"
const authRouter = express.Router();
import { postLogin, postSignup, getUser, updateUser, getLogout } from '../controllers/auth.js';
import { checkAuth } from "../middleware/checkAuth.js";

authRouter.post('/login', postLogin);
authRouter.get('/logout', getLogout);
authRouter.get('/users/me', checkAuth, getUser);
authRouter.post('/signup', postSignup);
authRouter.patch('/update/me', updateUser);


export default authRouter;