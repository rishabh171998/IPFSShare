"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()
async function main(filehash) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.email_id, 
      pass: process.env.password, 
    },
  });
  let info = await transporter.sendMail({
    from: '"Sender" <sender@xyzmail.com>', 
    to: "reciever@xyzmail.com", 
    subject: "File", 
    text: process.env.IPFS_GATEWAY+filehash, 
  });
  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
module.exports.mail=main;
