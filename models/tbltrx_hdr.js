module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbltrx_hdr', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    banksid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblbanks',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.FLOAT(18,2),
      allowNull: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tblusers',
        key: 'id'
      }
    },
    ismember: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'tbltrx_hdr',
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
        name: "UUID",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uuid" }
        ]
      },
      {
        name: "fk_tbltrxhdr_banksid",
        using: "BTREE",
        fields: [
          { name: "banksid" },
        ]
      },
      {
        name: "fk_tbltrxhdr_userid",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
