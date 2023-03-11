const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const initdb = require('../config/init-db');
const {getPagination, getPagingData} = require("../utils/pagination");
const {baseResponse} = require("../utils/response");
const models = initModels(initdb);

const PrivilegeController = {
    all(req, res) {
        const {page, size, name} = req.query
        const {limit, offset} = getPagination(page, size)
        console.info(limit)
        models.tblprivilege.findAndCountAll({
            limit,
            offset,
            where: {[Op.and]:{
                name :{
                    [Op.like]: name ?`%${name}%` : '%'
                }
            }}
        })
        .then((result) => {
            return res.status(200).json({
                "code":200,
                "message":"sukses",
                "data":getPagingData(result, page, limit)
            })
            // baseResponse(200, "sukses", getPagingData(result, page, limit));
        }).catch((err) => {
            console.error(err)
            return baseResponse(400, err, {});
        })
    },
    async save(req, res) {
        const name = req.body['name']
        var createdAt = Date.now()
        const [result, isCreated] = await models.tblprivilege.findOrCreate({
            where: {
                name: {
                    [Op.eq]: name
                }
            },
            defaults: {
                name : name,
                createdAt: createdAt
            }
        }).catch((err) =>{
            console.log(err)
            return res.status(400).json(err)
        })
        if(isCreated) {
            return res.status(200).json({"message": "save success"})
        }
        return res.status(200).json({"message": "privilege already exiss"})
    },
    delete(req, res) {
        var id = req.params['idprivilege']
        console.log(id)
        models.tblprivilege.destroy({
            where: {
                id : {
                    [Op.eq] : id
                }
            }
        }).then((result) => {
            console.log(result)
            if(!result) {
                return res.status(400).json({"message": "delete failed privilege not found"})
            }
            return res.status(200).json({"message":"delete success"})
        }).catch((err) => {
            console.error(err)
            return res.status(400).json(err)
        })
    }
}

module.exports = PrivilegeController