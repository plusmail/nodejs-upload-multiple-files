var DataTypes = require("sequelize").DataTypes;
var _uploadfiles = require("./uploadfiles");

function initModels(sequelize) {
  var uploadfiles = _uploadfiles(sequelize, DataTypes);


  return {
    uploadfiles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
