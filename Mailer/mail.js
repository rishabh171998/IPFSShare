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
    from: '"Rishabh" <umeshbhanot1@gmail.com>', 
    to: "rishabhbhanot10@gmail.com", 
    subject: "Hello ✔", 
    text: process.env.IPFS_GATEWAY+filehash, 
  });
  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
module.exports.mail=main;