const nodemailer = require('nodemailer');
module.exports = async function sendEmail(to, subject, text){
  // This helper uses environment SMTP settings. For development it will just log the message.
  if(!process.env.SMTP_HOST){
    console.log('--- sendEmail (dev) ---');
    console.log('to',to,'subject',subject,'text',text);
    return;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT||587),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  await transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, text });
};
