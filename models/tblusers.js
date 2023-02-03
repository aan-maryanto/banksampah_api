const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblusers', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "username"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    lastlogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "A"
    },
    is_verified : {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    is_superadmin: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tblusers',
    hasTrigger: true,
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
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
