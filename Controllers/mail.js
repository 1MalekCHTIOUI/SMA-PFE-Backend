
const nodemailer = require('nodemailer')
require("dotenv").config()
const path = require('path')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
      }
});


exports.sendMail = async (firstname,lastname,email, password) => {
    const ejs = require('ejs')
    console.log(process.env.GMAIL_EMAIL);
    console.log(process.env.GMAIL_PASS);
    try {
        transporter.verify(async(error, success) => {
            if (error) {
              console.log(error.message)
            } else {
                let output = await ejs.renderFile(path.join(__dirname, "../Views/mailTemplate.ejs"), { name: `${firstname} ${lastname}`, email: email, password: password })
                let info = await transporter.sendMail({
                    from: `Adiz-DATA <${process.env.GMAIL_EMAIL}>`,
                    to: email,
                    subject: `Platform Account`,
                    html: output
                })
                console.log('Email sent with: ' + `Email: ${email} | Password: ${password}`)
            }
        })
    }
    
    catch(e){
        console.log(e.message)
    }
}

