const initModel = require('../models/init-models')
const initdb = require('../config/init-db')
const model = initModel(initdb)

const dotenv = require('dotenv')
const { Op } = require('sequelize')
const initModel = require("../models/init-models");
dotenv.config()

const ProfileController = {
    getStatusProfile(req, res) {
        

    },
    updateProfile(req, res) {
        const {userId, fullname, pob, dob, address, nik, avatar} = req.body
        model.tblusers.findOrCreate({
            where:{

            }

        })
    }
}

module.exports = ProfileController