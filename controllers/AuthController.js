const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const initdb = require('../config/init-db');
const initmail = require('../config/sendemail');
const models = initModels(initdb);
const fs = require('fs');
const path = require('path');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const util = require("util");
dotenv.config()

const AuthController = {
    login(req, res) {
        console.log("Body"+ JSON.stringify(req.body))
        const {username, password} = req.body
        models.tblusers.findOne({
            where: {
                username:{
                    [Op.eq]:username
                }
            }
        })
        .then((result) => {
            if(!result) {
                return res.status(400).json({"message":"user not found"});
            }
            bcrypt.compare(password, result.password)
            .then((resp) => {
                if(!resp) {
                    return res.status(400).json({"message":"wrong password"})
                }else{
                    const {password, lastlogin, issuperadmin, ...filterData} = result.dataValues
                    var token = jwt.sign({
                        data: filterData
                    }, process.env.SALT, {expiresIn: '1h', algorithm: 'HS256'})
                    var refreshToken = jwt.sign({
                        data: filterData
                    }, process.env.SALT, { expiresIn: '10h', algorithm: 'HS256'})        
                    return res.status(200).json({"token":token, "refresh_token": refreshToken});
                }
            })  
        })
        .catch((error) => {
            console.error(error)
        })
    }
,
    async register(req, res) {
        const {username, email, password} = req.body;
        const result = await models.tblusers.findOrCreate({
            where: {
                [Op.or]: [
                    {
                        username: {
                            [Op.eq] : username
                        }
                    },
                    {
                        email: {
                            [Op.eq] : email
                        }
                    }
                ]
            },
            defaults:{
                username: username,
                email: email,
                password: bcrypt.hashSync(password, 10),
                status: 'I',
                is_verified : false,
                is_superadmin: false
            }
        }).catch((error) => {
            return res.status(500).status(error)
        })

        console.log("result : "+result)

        if(isCreated) {
            await models.tbluser_privilege.create({
                userid: result.id,
                privilegeid: 2
            })
            return res.status(200).json({"message": "register succes"})
        }
        return res.status(200).json({"message": "users already exist"})

    }
,
    forgotPassword(req, res){
        var email = req.body.email
        models.tblusers.findOne({
            where: {
                email: {
                    [Op.eq]:email
                }
            }
        }).then((result)=>{
            if(!result) {
                return res.status(400).json({"message":"user not found"})
            }
            var iduser = btoa(result.id)
            var link = "http://localhost:3000/updatepasswordbylink/"+iduser;
            const filepath = (__dirname, 'public/pages/forgotpassword.html')
            const source = fs.readFileSync(filepath, 'utf-8').toString();
            initmail.sendEmailForgot({
                'email': result.email, 
                'context':link, 
                'source': source, 
                'type':"password"
            },(result)=>{
                if(result) {
                    res.status(200).json({"message":"please check your email"})
                }else{
                    res.status(400).json({"message":"email not found"})
                }
            })
        }).catch((error) =>{
            console.error("Error"+error)
            return res.status(500).json({"message":error})
        })
    }
,
    updatePasswordByLink(req, res){
        var iduser = req.body.iduser
        var newpassword = req.body.newpassword

        models.tblusers.update({password:newpassword},{
            where: {
                id: {
                    [Op.eq]:iduser
                }
            }
        }).then((result) => {
            if(!result) {
                res.status(400).json({"message":"failed to update"})
            }
            res.status(200).json({"message":"success update password"})
        }).catch((err) => {
            console.error(err)
            res.status(500).json({"message":err})
        })
    }
,
    forgotUsername(req, res){
        var email = req.body.email

        models.tblusers.findOne({
            where: {
                email: {
                    [Op.eq]:email
                }
            }
        }).then((result)=>{
            if (!result) {
                res.status(200).json({"message":"email not found"})
            }
            var iduser = btoa(result.id)
            var username = result.username
            const filepath = path.join(__dirname, 'public/pages/forgotpassword.html');
            const source = fs.readFileSync(filepath, 'utf-8').toString();
            initmail.sendEmailForgot({
                'email':result.email, 
                'context':username, 
                'source':source,
                'type': "username"
            }, (result) => {
                if(result) {
                    res.status(200).json({"message":"please check your email"})
                }else{
                    res.status(400).json({"message":"email not found"})
                }
            })
        }).catch((err) => {
            console.error(err)
            return res.status(500).json({"message":err})
        })
    },
    sendEmail(req, res) {
        const filepath = path.join(__dirname, '../public/pages/forgotpassword.html');
        const source = fs.readFileSync(filepath, 'utf-8').toString();
        initmail.sendEmailForgot({
            'email':'maryanto.aan@gmail.com',
            'context':'maryanto.aan',
            'source':source,
            'type': "username"
        }, (result) => {
            if(result) {
                res.status(200).json({"message":"please check your email"})
            }else{
                res.status(400).json({"message":"email not found"})
            }
        })
    }
}

module.exports = AuthController
