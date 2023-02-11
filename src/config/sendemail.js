const fs = require('fs');
// const path = require('path');
const hbs = require('handlebars');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { send } = require('process');
const { response } = require('express');
dotenv.config()

const mail = {
    sendEmailForgot(data, next) {
        const template = hbs.compile(data.source);
        const dataHtml = {
            context : data.context
        }
        const htmlToSend = template(dataHtml);
        var mail = nodemailer.createTransport({
            host: process.env.GMAIL_SERVICE_HOST,
            port: process.env.GMAIL_SERVICE_PORT,
            secure: process.env.GMAIL_SERVICE_SECURE,
            requireTLS: process.env.GMAIL_SERVICE_TLS,
            service: process.env.GMAIL_SERVICE_NAME,
            auth:{
                user: process.env.GMAIL_USER_NAME,
                pass: process.env.GMAIL_USER_PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.GMAIL_USER_NAME,
            to: data.email,
            subject: data.type == "password" ? "Forgot Password" : "Forgot Username",
            html: htmlToSend
        }
        mail.sendMail(mailOptions, function(error, info){
            if(error) {
                console.log("Error :"+error)
                next(false)
            }else{
                console.log("Info"+ JSON.stringify(info))
                next(true)
            }
        })
    }
}

module.exports = mail