import Joi from '@hapi/joi';


// validation schema for req body
const signupValidation = (data)=>{
    const schema = Joi.object({
        userName: Joi.string().min(3).max(55).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(8).max(50).required(),
    });
    return schema.validate(data);
}

export default signupValidation;