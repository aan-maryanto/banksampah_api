const initModel = require('../models/init-models')
const initdb = require('../config/init-db')
const model = initModel(initdb)

const dotenv = require('dotenv')
const { Op } = require('sequelize')
dotenv.config()

const SatuanController = {
    all(req, res) {
        console.log("all")
        model.tblsatuan.findAll()
        .then((result) => {
            console.info(result)
            res.json(result)
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    get(req, res) {
        console.log("get")
        var id = req.params['idsatuan']
        model.tblsatuan.find({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        }).then((result) => {
            console.info(result)
            if(!result) {
                res.status(400).json({"message":"status not found"})
            }
            res.json(result)
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
    },
    save(req, res) {
        console.log("save")
        model.tblsatuan.findOrCreate({
            where: {
                name: {
                    [Op.eq]:req.body['kdsatuan']
                }
            },
            default: {
                kdsatuan: req.body['kdsatuan'],
                uraian: req.body['uraian'],
                createdBy: req.body['createdBy'],
                updatedBy: req.body['updatedBy']
            }
        }).then((result) => {
            console.info(result)
            res.json(result)
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })

    },
    delete(req, res) {
        console.log("delete")
        var id =  req.params['idsatuan']
        model.tblsatuan.destroy({
            where: {
                id: {
                    [Op.eq]:id
                }
            }
        }).then((result) => {
            console.info(result)
            res.status(result)
        }).catch((err) => {
            console.error(err)
            res.status(500).json(err)
        })
    }
}

module.exports = SatuanController