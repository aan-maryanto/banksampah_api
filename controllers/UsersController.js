const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const initdb = require('../config/init-db');
const models = initModels(initdb)
const bcrypt = require('bcrypt')


const UserController = {
    save(req, res) {
        models.tblusers.findOrCreate({
            where: {
                [Op.or]:[
                    {username:username},
                    {email:email}
                ]
            },
            default: {
                username: req.body['username'], 
                email: req.body['email'],
                password: bcrypt.hashSync(req.body['password'], 10),
                lastlogin: req.body['lastlogin'],
                status: req.body['status'],
                issuperadmin: req.body['issuperadmin']
            }
        }).then((result) => {
            // const {password, ...rest} = users.dataValues 
            console.log(result)
            if(!result) {
                return res.status(400).json({"message":"user already exist"})
            }
            return res.status(201).json({"message":"success to register user : "+username})
        }).catch((err) => {
            console.error(err)
        })
    },
    
    all(req, res) {
        models.tblusers.findAll({
            attributes:['username', 'email', 'lastlogin', 'status', 'issuperadmin']
        })
        .then((data) => {
            return res.json(data);
        } )
        .catch((error) => {
            console.error(error)
        })
    }
,
    allexceptsu(req, res) {
        models.tblusers.findAll({
            attributes:['username', 'email', 'lastlogin', 'status', 'issuperadmin'],
            where: {
                issuperadmin: {
                    [Op.ne]: 1
                }
            }
        })
        .then((data) => {
            return res.json(data)
        })
        .catch((error) => {
            console.error(error)
        })
    }
,
    allbyprivilege(req, res) {
        const id = req.params.id;
        models.tblusers.findAll({
            attributes:['username', 'email', 'lastlogin', 'status', 'issuperadmin'],
            raw: true,
            include: {
                model: models.tbluser_privilege,
                as: 'tbluser_privileges',
                attributes: ['userid', 'privilegeid'],
                where: {
                    privilegeid: {
                        [Op.eq]:id
                    }
                }
            }
        })
        .then((data) => {
            return res.json(data)
        })
        .catch((error) => {
            console.error(error)
        })
    }
,
    byid(req, res) {
        const id = req.params.id;
        models.tblusers.findOne({
            attributes:['username', 'email', 'lastlogin', 'status', 'issuperadmin'],
            raw: true,
            where: {
                id: {
                    [Op.eq]:id
                }
            }
        })
    }

}

module.exports = UserController;