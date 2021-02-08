import express from 'express';
import bodyParser from 'body-parser';
import Sign from '../controllers/auth.js';

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/signup', Sign);
router.post('/login', (req, res) => {
    
});

export default router;