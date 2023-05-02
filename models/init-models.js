var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _uploadfiles = require("./uploadfiles");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var uploadfiles = _uploadfiles(sequelize, DataTypes);


  return {
    board,
    uploadfiles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
