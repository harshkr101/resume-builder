
import User from '../models/user.js'
import signupValidation from '../utils/validation.js';
import bcrypt from 'bcrypt';


export const Sign = async (req, res) => {
    

    // validate the incoming data
    const { error } = signupValidation(req.body);
    
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }


    // check if user exists

    User.findOne({
        email: req.body.email
    }).exec((error, user) => {
            if (user)
                return res.status(400).json({
                    message: 'User already exists.'
                });
        });


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
                        user: data
                    });
                }
            });
        } catch (error) {
            res.status(400).json({error});
        }
      

};

export const login = ()=>{

}

