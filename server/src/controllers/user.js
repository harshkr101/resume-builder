import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const getUser = async (req,res)=>{
    const user = await User.findById(req.params.id).exec();
    res.status(200).json({
        user: {
          id:user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
    });
}


export const updateUser = async (req, res) => {
    try {

      // check if request contains user password
      if(req.body.password){
             // hash the password
             const salt = await bcrypt.genSalt(10);
             const password = await bcrypt.hash(req.body.password, salt);
             req.body.password = password;
      }

      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
        .lean()
        .exec()
  
      res.status(200).json({
         user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
         } 
        })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
