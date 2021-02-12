
import User from '../models/user.js'
import signupValidation from '../utils/validation.js';





export const Sign = (req, res) => {
    console.log(req.body);

    // validate the incoming data
    const { error } = signupValidation(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }



    User.findOne({
            email: req.body.email
        })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'User already exists.'
            });

            const {
                userName,
                password,
                firstName,
                lastName,
                email
            } = req.body;





            const _user = new User({
                userName,
                password,
                firstName,
                lastName,
                email
            });

            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went wrong...'
                    });
                }
                if (data) {
                    return res.status(200).json({
                        message: 'User created successfully...',
                    });
                }
            });
        })
};

export const login = ()=>{

}

