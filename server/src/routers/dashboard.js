import express from 'express';
import {getUser,  updateUser } from '../controllers/user.js';

const router = express.Router();

  router.get('/user/:id',getUser);
  router.put("/user/:id",updateUser);
  
  export default router;