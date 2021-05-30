// const fs = require('fs');
// const path = require('path');
const hbs = require('handlebars');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()

sendEmail(html,(err, html)=>{
    const filepath = path.join(html)
});
    