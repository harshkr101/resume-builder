import nodemailer from 'nodemailer';
import {config} from '../config/config.js';

const sendMail= (sender,recipient,subject,content) => {
    

 let transport = nodemailer.createTransport({
        host: config.MAIL_HOST,
        port: config.MAIL_PORT,
        auth: {
          user: config.MAIL_USER,
          pass: config.MAIL_PASSWORD
        }
      });

    const message = {
        from: sender, // Sender address
        to: recipient,         // List of recipients
        subject: subject, // Subject line
        html: content
    };

   transport.sendMail(message, function(err, info) {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log('Email Sent Successfully');
        }
    });

}

export default sendMail;