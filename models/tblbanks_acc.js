module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tblbanks_acc', {
    banksuserid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblbanks',
        key: 'id'
      }
    },
    banksname: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblbanks_users',
        key: 'id'
      }
    },
    banksrole: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblbanks_role',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tblbanks_acc',
    timestamps: false,
    indexes: [
      {
        name: "fk_banksusers",
        using: "BTREE",
        fields: [
          { name: "banksuserid" },
        ]
      },
      {
        name: "fk_banksname",
        using: "BTREE",
        fields: [
          { name: "banksname" },
        ]
      },
      {
        name: "fk_banksrole",
        using: "BTREE",
        fields: [
          { name: "banksrole" },
        ]
      },
    ]
  });
};
