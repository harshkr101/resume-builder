import nodemailer from 'nodemailer';
import {config} from '../config/config.js';

const sendMail= (sender,recipient,subject,content) => {
    
  // let transport = nodemailer.createTransport({
  //       host: config.MAIL_HOST,
  //       port: config.MAIL_PORT,
  //       auth: {
  //         user: config.MAIL_USER,
  //         pass: config.MAIL_PASSWORD
  //       }
  //     });

     

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ee6e5f6f3a7dd1",
      pass: "5cd4222f0aa883"
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