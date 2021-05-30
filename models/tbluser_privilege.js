const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbluser_privilege', {
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblusers',
        key: 'id'
      }
    },
    privilegeid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblprivilege',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tbluser_privilege',
    timestamps: false,
    indexes: [
      {
        name: "fk_userid_privilege",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "fk_privilegeid_user",
        using: "BTREE",
        fields: [
          { name: "privilegeid" },
        ]
      },
    ]
  });
};
