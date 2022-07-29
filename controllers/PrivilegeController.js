const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const initdb = require('../config/init-db');
const models = initModels(initdb);

const PrivilegeController = {
    all(req, res) {
        models.tblprivilege.findAll()
        .then((data) => {
            console.info(data)
            res.json(data)
        }).catch((err) => {
            console.error(err)
        })
    },
    byid(req, res) {
        var param  = req.params
        models.tblprivilege.find({
            where: {
                id:{
                    [Op.eq]:param['c']
                }
            }
        }).then((result) => {
            console.info(result)
            if(!result) {
                res.status(400).json({"message": "privilege not found"})
            }
            res.json(result)
        })
    },
    save(req, res) {
        var param = req.body
        var createdAt = Date.now()
        models.tblprivilege.findOrCreate({
            where: {
                name: {
                    [Op.eq]: param['name']
                }
            },
            default: {
                name : param['name'],
                createdAt: createdAt
            }
        }).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.error(err)
        })
    },
    delete(req, res) {
        var id = req.params['idprivilege']
        models.tblprivilege.destroy({
            where: {
                id : {
                    [Op.eq] : id
                }
            }
        }).then((result) => {
            console.info(result)
        }).catch((err) => {
            console.error(err)
        })
    }
}

module.exports = PrivilegeController