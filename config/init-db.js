const Sequelize = require('sequelize');
const dotenv = require('dotenv')
dotenv.config()

const initdb = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    operatorAliases: false
})

module.exports = initdb