import express from 'express';
import { login, logout, signup, verify } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/verify/:token',verify);

export default router;

//9082686103