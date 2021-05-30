const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const initdb = require('../config/init-db');
const models = initModels(initdb)


const UserController = {
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