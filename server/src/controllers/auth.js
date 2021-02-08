import express from 'express';
import User from '../models/user.js'
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Sign = (req, res) => {
    console.log(req.body);
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(user) return res.status(400).json({
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
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong...'
                });
            }
            if(data){
                return res.status(200).json({
                    message: 'User created successfully...',
                });
            }
        });
    })
};

export default Sign;