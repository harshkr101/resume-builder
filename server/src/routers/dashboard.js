import express from 'express';
import {getUser,  updateUser } from '../controllers/user.js';
import controllers from '../controllers/resume.js';

const router = express.Router();

        router
        .route('/user/:id')     
        .get(getUser)
        .put(updateUser);
  

        router.
        route('/resume')
        .post(controllers.createOne)
  
        router
        .route('/resume/:id')
        .get(controllers.getOne)
        .put(controllers.updateOne)
        .delete(controllers.removeOne);

        router.route('/resume/all/:id')
        .get(controllers.getMany);


  export default router;