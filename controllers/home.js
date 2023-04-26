const path = require("path");

const home = (req, res) => {
  return res.render('index');
};

module.exports = {
  getHome: home
};
