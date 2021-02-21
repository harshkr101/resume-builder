
import User from '../models/user.js'
import {signupValidation,loginValidation} from '../utils/validation.js';
import bcrypt from 'bcrypt';
import {config} from '../config/config.js';
import jwt from 'jsonwebtoken';

export const Sign = async (req, res) => {
    

    // validate the incoming data
    const { error } = signupValidation(req.body);
    
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }


    // check if user exists

        const userExists = await User.findOne({email: req.body.email}).exec();
        if(userExists){
            return res.status(400).json({error: 'User already exists'});
        }


           // create a new user if user doesn't exists

            // hash the password
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);

        const _user = new User({
            userName:  req.body.userName,
            firstName: req.body.firstName,
            lastName:  req.body.lastName,
            email:     req.body.email,
            password 
        });

        // save user to db
        try {
            _user.save((error, data) => {
                if (error) {
                    console.error(error);
                    return res.status(400).json({
                        message: 'Something went wrong...',
                        error: error
                    });
                }
                if (data) {
                    return res.status(200).json({
                        message: 'SignUp Successfull',
                        user: {
                            id: data._id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email
                        }
                    });
                }
            });
        } catch (error) {
            res.status(400).json({error});
        }
      

};

export const Login = async (req,res)=>{
    
    //validate the incoming data
    const {error} = loginValidation(req.body);
    
    if(error){
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    // check for user
    const user = await User.findOne({email: req.body.email}).exec();


    if(!user){
        console.log(user);
        return res.status(400).json({error: "Check your email"});
    }

    // validate user password
    const validPassword = await bcrypt.compare(req.body.password,user.password);

    if(!validPassword){
        return res.status(400).json({error:'Wrong Password'});
    }


    // create a jwt token
    const token = jwt.sign(
        // payload
        {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        },
        // jwt secret key
        config.JWT_SECRET
        );
    

    res.header("auth-token",token).status(200).json({
        error: null,
        token
    })
   
}

