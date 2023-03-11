var DataTypes = require("sequelize").DataTypes;
var _tblbanks = require("./tblbanks");
var _tblbanks_acc = require("./tblbanks_acc");
var _tblbanks_role = require("./tblbanks_role");
var _tblbanks_users = require("./tblbanks_users");
var _tblgoods_raw = require("./tblgoods_raw");
var _tbljns_product = require("./tbljns_product");
var _tbllogs = require("./tbllogs");
var _tblpost_image = require("./tblpost_image");
var _tblposts = require("./tblposts");
var _tblprivilege = require("./tblprivilege");
var _tblproduct = require("./tblproduct");
var _tblprofile = require("./tblprofile");
var _tblsatuan = require("./tblsatuan");
var _tbltmpusers = require("./tbltmpusers");
var _tbltrx_dtl = require("./tbltrx_dtl");
var _tbltrx_hdr = require("./tbltrx_hdr");
var _tbluser_privilege = require("./tbluser_privilege");
var _tblusers = require("./tblusers");

function initModels(sequelize) {
  var tblbanks = _tblbanks(sequelize, DataTypes);
  var tblbanks_acc = _tblbanks_acc(sequelize, DataTypes);
  var tblbanks_role = _tblbanks_role(sequelize, DataTypes);
  var tblbanks_users = _tblbanks_users(sequelize, DataTypes);
  var tblgoods_raw = _tblgoods_raw(sequelize, DataTypes);
  var tbljns_product = _tbljns_product(sequelize, DataTypes);
  var tbllogs = _tbllogs(sequelize, DataTypes);
  var tblpost_image = _tblpost_image(sequelize, DataTypes);
  var tblposts = _tblposts(sequelize, DataTypes);
  var tblprivilege = _tblprivilege(sequelize, DataTypes);
  var tblproduct = _tblproduct(sequelize, DataTypes);
  var tblprofile = _tblprofile(sequelize, DataTypes);
  var tblsatuan = _tblsatuan(sequelize, DataTypes);
  var tbltmpusers = _tbltmpusers(sequelize, DataTypes);
  var tbltrx_dtl = _tbltrx_dtl(sequelize, DataTypes);
  var tbltrx_hdr = _tbltrx_hdr(sequelize, DataTypes);
  var tbluser_privilege = _tbluser_privilege(sequelize, DataTypes);
  var tblusers = _tblusers(sequelize, DataTypes);

  tblbanks_acc.belongsTo(tblbanks, { as: "banksuser", foreignKey: "banksuserid"});
  tblbanks.hasMany(tblbanks_acc, { as: "tblbanks_accs", foreignKey: "banksuserid"});
  tbltrx_hdr.belongsTo(tblbanks, { as: "bank", foreignKey: "banksid"});
  tblbanks.hasMany(tbltrx_hdr, { as: "tbltrx_hdrs", foreignKey: "banksid"});
  tblbanks_acc.belongsTo(tblbanks_role, { as: "banksrole_tblbanks_role", foreignKey: "banksrole"});
  tblbanks_role.hasMany(tblbanks_acc, { as: "tblbanks_accs", foreignKey: "banksrole"});
  tblbanks_acc.belongsTo(tblbanks_users, { as: "banksname_tblbanks_user", foreignKey: "banksname"});
  tblbanks_users.hasMany(tblbanks_acc, { as: "tblbanks_accs", foreignKey: "banksname"});
  tblproduct.belongsTo(tbljns_product, { as: "jnsproduct_tbljns_product", foreignKey: "jnsproduct"});
  tbljns_product.hasMany(tblproduct, { as: "tblproducts", foreignKey: "jnsproduct"});
  tblpost_image.belongsTo(tblposts, { as: "post", foreignKey: "postid"});
  tblposts.hasMany(tblpost_image, { as: "tblpost_images", foreignKey: "postid"});
  tbluser_privilege.belongsTo(tblprivilege, { as: "privilege", foreignKey: "privilegeid"});
  tblprivilege.hasMany(tbluser_privilege, { as: "tbluser_privileges", foreignKey: "privilegeid"});
  tblgoods_raw.belongsTo(tblsatuan, { as: "satuan_tblsatuan", foreignKey: "satuan"});
  tblsatuan.hasMany(tblgoods_raw, { as: "tblgoods_raws", foreignKey: "satuan"});
  tblsatuan.belongsTo(tblsatuan, { as: "createdBy_tblsatuan", foreignKey: "createdBy"});
  tblsatuan.hasMany(tblsatuan, { as: "tblsatuans", foreignKey: "createdBy"});
  tblsatuan.belongsTo(tblsatuan, { as: "updatedBy_tblsatuan", foreignKey: "updatedBy"});
  tblsatuan.hasMany(tblsatuan, { as: "updatedBy_tblsatuans", foreignKey: "updatedBy"});
  tbltrx_dtl.belongsTo(tbltrx_hdr, { as: "trxhdr", foreignKey: "trxhdr_id"});
  tbltrx_hdr.hasMany(tbltrx_dtl, { as: "tbltrx_dtls", foreignKey: "trxhdr_id"});
  tblbanks.belongsTo(tblusers, { as: "createdBy_tbluser", foreignKey: "createdBy"});
  tblusers.hasMany(tblbanks, { as: "tblbanks", foreignKey: "createdBy"});
  tblbanks.belongsTo(tblusers, { as: "updatedBy_tbluser", foreignKey: "updatedBy"});
  tblusers.hasMany(tblbanks, { as: "updatedBy_tblbanks", foreignKey: "updatedBy"});
  tblbanks_role.belongsTo(tblusers, { as: "createdBy_tbluser", foreignKey: "createdBy"});
  tblusers.hasMany(tblbanks_role, { as: "tblbanks_roles", foreignKey: "createdBy"});
  tblbanks_role.belongsTo(tblusers, { as: "updatedBy_tbluser", foreignKey: "updatedBy"});
  tblusers.hasMany(tblbanks_role, { as: "updatedBy_tblbanks_roles", foreignKey: "updatedBy"});
  tblbanks_users.belongsTo(tblusers, { as: "createdBy_tbluser", foreignKey: "createdBy"});
  tblusers.hasMany(tblbanks_users, { as: "tblbanks_users", foreignKey: "createdBy"});
  tblbanks_users.belongsTo(tblusers, { as: "updatedBy_tbluser", foreignKey: "updatedBy"});
  tblusers.hasMany(tblbanks_users, { as: "updatedBy_tblbanks_users", foreignKey: "updatedBy"});
  tblgoods_raw.belongsTo(tblusers, { as: "createdBy_tbluser", foreignKey: "createdBy"});
  tblusers.hasMany(tblgoods_raw, { as: "tblgoods_raws", foreignKey: "createdBy"});
  tblgoods_raw.belongsTo(tblusers, { as: "updatedBy_tbluser", foreignKey: "updatedBy"});
  tblusers.hasMany(tblgoods_raw, { as: "updatedBy_tblgoods_raws", foreignKey: "updatedBy"});
  tbljns_product.belongsTo(tblusers, { as: "createdBy_tbluser", foreignKey: "createdBy"});
  tblusers.hasMany(tbljns_product, { as: "tbljns_products", foreignKey: "createdBy"});
  tbljns_product.belongsTo(tblusers, { as: "updatedBy_tbluser", foreignKey: "updatedBy"});
  tblusers.hasMany(tbljns_product, { as: "updatedBy_tbljns_products", foreignKey: "updatedBy"});
  tblproduct.belongsTo(tblusers, { as: "createdBy_tbluser", foreignKey: "createdBy"});
  tblusers.hasMany(tblproduct, { as: "tblproducts", foreignKey: "createdBy"});
  tblproduct.belongsTo(tblusers, { as: "updatedBy_tbluser", foreignKey: "updatedBy"});
  tblusers.hasMany(tblproduct, { as: "updatedBy_tblproducts", foreignKey: "updatedBy"});
  tblprofile.belongsTo(tblusers, { as: "user", foreignKey: "userid"});
  tblusers.hasMany(tblprofile, { as: "tblprofiles", foreignKey: "userid"});
  tbltmpusers.belongsTo(tblusers, { as: "user", foreignKey: "userid"});
  tblusers.hasMany(tbltmpusers, { as: "tbltmpusers", foreignKey: "userid"});
  tbltrx_hdr.belongsTo(tblusers, { as: "user", foreignKey: "userid"});
  tblusers.hasMany(tbltrx_hdr, { as: "tbltrx_hdrs", foreignKey: "userid"});
  tbluser_privilege.belongsTo(tblusers, { as: "user", foreignKey: "userid"});
  tblusers.hasMany(tbluser_privilege, { as: "tbluser_privileges", foreignKey: "userid"});

  return {
    tblbanks,
    tblbanks_acc,
    tblbanks_role,
    tblbanks_users,
    tblgoods_raw,
    tbljns_product,
    tbllogs,
    tblpost_image,
    tblposts,
    tblprivilege,
    tblproduct,
    tblprofile,
    tblsatuan,
    tbltmpusers,
    tbltrx_dtl,
    tbltrx_hdr,
    tbluser_privilege,
    tblusers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
