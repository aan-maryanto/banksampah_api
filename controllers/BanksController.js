const initModel = require("../models/init-models")
const {Op} = require("sequelize")
const initDb = require("../config/init-db")
const {getPagination, getPagingData} = require("../utils/pagination");
const {baseResponse} = require("../utils/response");
const model = initModel(initDb)

const BanksController = {
    all(req, res) {
        const {page, size, name, address} = req.query
        const condition1 = name ? {name :{[Op.like]: `%${name}%`}}:null
        const condition2 = address ? {address:{[Op.like] : `%${address}%`}}:null
        const {limit, offset} = getPagination(page, size)
      model.tblbanks.findAndCountAll({
          limit,
          offset,
          where:{[Op.and]:{condition1, condition2}}
      }).then((result) => {
          console.info(result)
          const response = getPagingData(result, page, limit)
          baseResponse(200, "sukses", response);
      }).catch((err) => {
          console.error(err)
          baseResponse(400,err,{})
      })
    },
    save(req, res) {
        model.tblbanks.create({
            name: req.bankName,
            address: req.bankAddress,
            coordinates: req.bankCoordinates,
            notelp: req.bankNoTelp,
            status: 'A',
            image: req.bankImage === null ? '/bank/image/default.jpg' : req.bankImage,
        }).then((result) => {
            console.info(result)
        }).catch((err) => {
            console.error(err)
        })
    },
    delete(req, res) {
        model.tblbanks.delete(
            {
                where: {
                    id: {
                        [Op.eq] : req.params.id
                    }
                }
            }
        ).then((result) => {
            console.info(result)
        }).catch((err) => {
            console.error(err)
        })
    }
}

module.exports = BanksController