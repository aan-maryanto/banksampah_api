const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblprofile', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblusers',
        key: 'id'
      }
    },
    fullname: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    pob: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nik: {
      type: DataTypes.STRING(16),
      allowNull: true,
      unique: "nik"
    },
    avatar: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tblprofile',
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
        name: "nik",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nik" },
        ]
      },
      {
        name: "fk_users_profile",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
