const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const initdb = require('../config/init-db');
const models = initModels(initdb);

const PrivilegeController = {
    all(req, res) {
        models.tblprivilege.findAll()
        .then((data) => {
            return res.json(data)
        }).catch((err) => {
            return res.status(400).json(err)
        })
    },
    byid(req, res) {
        var param  = req.params
        models.tblprivilege.findOne({
            where: {
                id:{
                    [Op.eq]:param['idprivilege']
                }
            }
        }).then((result) => {
            console.info(result)
            if(!result) {
                return res.status(400).json({"message": "privilege not found"})
            }
            return res.json(result)
        }).catch((err) => {
            return res.status(400).json(err)
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