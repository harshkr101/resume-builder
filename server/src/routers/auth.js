import express from 'express';
import {Sign} from '../controllers/auth.js';


const router = express.Router();

router.post('/signup', Sign);
router.post('/login', (req, res) => {
    
});

export default router;