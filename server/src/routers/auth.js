import express from 'express';
import {Sign,Login} from '../controllers/auth.js';


const router = express.Router();

router.post('/signup', Sign);
router.post('/login', Login);

export default router;