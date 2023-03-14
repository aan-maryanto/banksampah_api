module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblproduct', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    jnsproduct: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbljns_product',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true
    },
    price: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
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
    tableName: 'tblproduct',
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
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" }
        ]
      },
      {
        name: "fk_user_jns_product",
        using: "BTREE",
        fields: [
          { name: "jnsproduct" },
        ]
      },
      {
        name: "fk_tblprod_create",
        using: "BTREE",
        fields: [
          { name: "createdBy" },
        ]
      },
      {
        name: "fk_tblprod_update",
        using: "BTREE",
        fields: [
          { name: "updatedBy" },
        ]
      },
    ]
  });
};
