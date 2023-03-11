const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbltrx_dtl', {
    trxhdr_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbltrx_hdr',
        key: 'id'
      }
    },
    goods_rawid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbltrx_dtl',
    timestamps: true,
    indexes: [
      {
        name: "fk_tbltrxdtl_rawid",
        using: "BTREE",
        fields: [
          { name: "trxhdr_id" },
        ]
      },
    ]
  });
};
