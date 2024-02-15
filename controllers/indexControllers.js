const bcrypt = require("bcrypt");
const connection = require("../config/db");

class IndexControllers {
  viewIndex = (req, res) => {
    let sql = "SELECT * FROM restaurant WHERE restaurant_isdeleted = 0";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("index", { result });
    });
  };

  //FALTA EL BORRADO PERMANENTE ( NO QUIERO PONERLO)
}

module.exports = new IndexControllers();
