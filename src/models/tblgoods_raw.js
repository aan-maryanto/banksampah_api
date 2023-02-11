const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblgoods_raw', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    satuan: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblsatuan',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblusers',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblusers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tblgoods_raw',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_tblgoodsraw_satuan",
        using: "BTREE",
        fields: [
          { name: "satuan" },
        ]
      },
      {
        name: "fk_tblgoodsraw_create",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
      {
        name: "fk_tblgoodsraw_update",
        using: "BTREE",
        fields: [
          { name: "updatedBy" },
        ]
      },
    ]
  });
};
