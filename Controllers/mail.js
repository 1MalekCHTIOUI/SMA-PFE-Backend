
const nodemailer = require('nodemailer')
require("dotenv").config()
const path = require('path')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:true,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS
    }
});


exports.sendMail = async (firstname,lastname,email, password) => {
    const ejs = require('ejs')
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
                console.log('Email sent: ' + info.response);
                console.log('Email sent with: ' + `Email: ${email} | Password: ${password}`)
            }
        })
    }
    
    catch(e){
        console.log(e.message)
    }
}

