const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const initdb = require('../config/init-db');
const models = initModels(initdb);

const transactionController = {
    all(req, res) {},
    save(req, res) {},
    delete(req, res) {}
}

module.exports = transactionController