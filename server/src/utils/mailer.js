import nodemailer from 'nodemailer';
import {config} from '../config/config.js';
import {google} from 'googleapis';

const sendMail=  (sender,recipient,subject,content) => {


  const message = {
    from: sender, // Sender address 
    to: recipient,         // List of recipients
    subject: subject, // Subject line
    html: content
  }; 

  const createTransporter = async () => {

  const OAuth2 = google.auth.OAuth2;


 
    const oauth2Client = new OAuth2(
      config.OAUTH_CLIENTID,
      config.OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
  
    oauth2Client.setCredentials({
      refresh_token: config.OAUTH_REFRESH_TOKEN
    });

  const accessToken =  await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    }); 
  });

  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.MAIL_USER,
        accessToken,
        clientId: config.OAUTH_CLIENTID,
        clientSecret: config.OAUTH_CLIENT_SECRET,
        refreshToken: config.OAUTH_REFRESH_TOKEN
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    return transporter;
  }


  const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
  };

  try {
    sendEmail(message);
  } catch (error) {
      console.error(error);
  }

}


export default sendMail;