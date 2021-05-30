const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const initdb = require('../config/init-db');
const models = initModels(initdb);
const fs = require('fs');
const path = require('path');

const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config()

const AuthController = {
    login(req, res) {
        console.log("Body"+ JSON.stringify(req.body))
        var username = req.body.username;
        var password = req.body.password;
        models.tblusers.findOne({
            where: {
                username:{
                    [Op.eq]:username
                }
            }
        })
        .then((result) => {
            var token = jwt.sign({
                data: result
            }, process.env.SALT, {expiresIn: '1h'})
            // var hashpass = bcrypt.hashSync("P@ssw0rd", 12)
            // console.log("Hashpassword"+hashpass);
            if(!result) {
                return res.status(400).json({"message":"user not found"});
            }
            bcrypt.compare(password, result.password)
            .then((resp) => {
                if(!resp) {
                    return res.status(400).json({"message":"wrong password"})
                }else{
                    return res.status(200).json({"token":token});
                }
            })  
        })
        .catch((error) => {
            console.error(error)
        })
    }
,
    register(req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var status = "A";
        var createdAt = Date.now();
        var issuperadmin = false; 
        models.tblusers.findOrCreate({
            where: {
                [Op.or]:[
                    {username:username},
                    {email:email}
                ]
            },
            default: {
                username: username,
                email: email,
                password: bcrypt.hashSync(password),
                createdAt: createdAt,
                status: status,
                issuperadmin: issuperadmin
            }
        }).then((result) => {
            console.log(result)
            if(!result) {
                return res.status(400).json({"message":"user already exist"})
            }
            return res.status(200).json({"message":"success to register"})
        }).catch((error) => {
            console.log(error)
        })

    }
,
    forgotPassword(req, res){
        // var email = req.body.email;
        var email = req.params.email

        const filepath = path.join(__dirname, '../public/pages/forgotpassword.html');
        const source = fs.readFileSync(filepath, 'utf-8').toString();
        const template = hbs.compile(source);
        const dataHtml = {
            newPassword : 'P@ssw0rd'
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
            to: email,
            subject: 'Forgot Password',
            html: htmlToSend
            // html: { path: 'public/pages/forgotpassword.html' }
        }

            mail.sendMail(mailOptions, function(error, info){
                if(error) {
                    console.log(error)
                }else{
                    return res.status(200).json({"message":"Please check your email to confirm"})
                }
            })

        // models.tblusers.findOne({
        //     where: {
        //         [Op.eq]:[
        //             {email:email}
        //         ]
        //     }
        // }).then((result)=>{
        //     if(!result) {
        //         return res.status(400).json({"message":"user not found"})
        //     }
        //     mail.sendMail(mailOptions, function(error, info){
        //         if(error) {
        //             console.log(error)
        //         }else{
        //             return res.status(200).json({"message":"Please check your email to confirm"})
        //         }
        //     })
        // }).catch((error) =>{
        //     console.log(error)
        // })
    }
,
    forgotUsername(req, res){

    }

}

module.exports = AuthController
