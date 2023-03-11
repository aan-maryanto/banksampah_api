const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const initdb = require('../config/init-db');
const models = initModels(initdb)
const bcrypt = require('bcrypt')
const {getPagination, getPagingData} = require("../utils/pagination");


const UserController = {
    all(req, res) {
        const {page, size, username, email} = req.query
        const {limit, offset} = getPagination(page, size)
        models.tblusers.findAndCountAll({
            limit,
            offset,
            attributes:['username', 'email', 'lastlogin', 'status'],
            where: {
                [Op.and]:{
                    username :{
                        [Op.like]: username ?`%${username}%` : '%'
                    },
                    email: {
                        [Op.like]: email ? `%${email}%` : '%'
                    }
                }
            }
        })
        .then((result) => {
            console.info(result)
            return res.status(200).json({
                "code":200,
                "message":"sukses",
                "data":getPagingData(result, page, limit)
            })
        } )
        .catch((error) => {
            console.error(error)
        })
    }
,
    allexceptsu(req, res) {
        models.tblusers.findAll({
            attributes:['username', 'email', 'lastlogin', 'status',],
            where: {
                is_superadmin: {
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
            attributes:['username', 'email', 'lastlogin', 'status'],
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
            attributes:['username', 'email', 'lastlogin', 'status'],
            raw: true,
            where: {
                id: {
                    [Op.eq]:id
                }
            }
        })
    }
,
    addProfile(req, res) {
        var param = req.body
        models.tblprofile.findOrCreate({
            where: {
                [Op.eq] : {
                    userid: param['userid']
                }
            },
            default: {
                userid: param['userid'],
                fullname: param['fullname'],
                pob: param['pob'],
                dob: param['dob'],
                address: param['address'],
                nik: param['nik'],
                avatar: param['avatar']
            }
        }).then((result) => {
            console.log(result)
            if(!result) {
                return res.status(400).json({"message":"user already exist"})
            }
            return res.status(201).json({"message":"success to add profile user : "+param['fullname']})
        }).catch((err)=>{
            console.error(err)
        })
    }
,
    getProfile(req, res) {
        var param = req.body
        models.tblprofile.findOne({
            where: {
                [Op.eq]: {
                    userid : param['userid']
                }
            }
        }).then((result)=>{
            console.log(result)
            if(result) {
                return res.status(400).json({"message" : "user sudah punya profile"})
            }
            return res.status(200).json({"message":"silakan lengkapi profile"})
        })
    }

}

module.exports = UserController;