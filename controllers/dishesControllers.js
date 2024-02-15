const bcrypt = require("bcrypt");
const connection = require("../config/db");

class DishesControllers {
  // INUTILIZADA DE MOMENTO
  viewRestaurants = (req, res) => {
    res.render("dishes");
  };

  viewRegisterDish = (req, res) => {
    let id = req.params.id;
    res.render("registerDish", { restaurant_id: id });
  };

  registerDish = (req, res) => {
    let id = req.params.id;
    const { dish_name, dish_description } = req.body;
    if (dish_name === "" || dish_description === "" || req.file === undefined) {
      return res.render("registerDish", {
        message: "RELLENE TODOS LOS CAMPOS",
        restaurant_id: id,
      });
    }

    let img = req.file.filename;
    let sql = `INSERT INTO dish (dish_name, dish_description, restaurant_id, dish_img) VALUES ("${dish_name}", "${dish_description}", "${id}", "${img}")`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurants/oneRestaurant/${id}`);
    });
  };

  viewEditDish = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM dish WHERE dish_id = ${id} AND dish_isdeleted =0`;
    connection.query(sql, (err, result_dish) => {
      if (err) throw err;
      res.render("editDish", { result_dish });
    });
  };

  editDish = (req, res) => {
    let { id, restaurant_id } = req.params;
    const { dish_name, dish_description } = req.body;
    let sql = `UPDATE dish SET dish_name = "${dish_name}", dish_description = "${dish_description}" WHERE dish_id = ${id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE dish SET dish_name = "${dish_name}", dish_description = "${dish_description}", dish_img = "${img}" WHERE dish_id = ${id}`;
    }

    connection.query(sql, (err, result_dish) => {
      if (err) throw err;
      res.redirect(`/restaurants/oneRestaurant/${restaurant_id}`);
    });
  };

  deleteDishPermanent = (req, res) => {
    let { id, restaurant_id } = req.params;
    let sql = `DELETE FROM dish WHERE dish_id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurants/oneRestaurant/${restaurant_id}`);
    });
  };

  deleteDishLogic = (req, res) => {
    let {id, restaurant_id} = req.params;
    console.log(id);
    let sql = `UPDATE dish SET dish_isdeleted = 1 WHERE dish_id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurants/oneRestaurant/${restaurant_id}`);
    });
  };
}

module.exports = new DishesControllers();
