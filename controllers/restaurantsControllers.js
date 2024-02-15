const bcrypt = require("bcrypt");
const connection = require("../config/db");

class RestaurantsControllers {
  // INUTILIZADA DE MOMENTO
  viewRestaurants = (req, res) => {
    res.render("restaurants");
  };

  viewRegisterRestaurant = (req, res) => {
    res.render("registerRestaurant");
  };

  createRestaurant = (req, res) => {
    const {
      restaurant_name,
      style,
      email,
      password,
      password2,
      restaurant_description,
      phone_number,
    } = req.body;
    if (
      restaurant_name === "" ||
      style === "" ||
      email === "" ||
      password === "" ||
      restaurant_description == "" ||
      phone_number == "" ||
      req.file == undefined
    ) {
      return res.render("registerRestaurant", {
        message: "RELLENE TODOS LOS CAMPOS",
      });
    }

    if (
      restaurant_name.length > 50 ||
      style.length > 25 ||
      restaurant_description.length > 200 ||
      phone_number.length > 20 ||
      email.length > 100
    ) {
      return res.render("registerRestaurant", {
        message: "LIMITE SUPERADO EN ALGUNO DE LOS CAMPOS",
      });
    }

    if (password !== password2) {
      return res.render("registerRestaurant", {
        message: "LA CONTRASEÑA NO COINCIDE",
      });
    }

    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;

      let img = req.file.filename;

      let sql = `INSERT INTO restaurant (restaurant_name, style, email, password, restaurant_description, phone_number, restaurant_img) VALUES ("${restaurant_name}","${style}","${email}","${hash}", "${restaurant_description}", "${phone_number}", "${img}")`;

      connection.query(sql, (err, result) => {
        if (err) {
          if (err.errno == 1062) {
            return res.render("registerRestaurant", {
              message: "el email ya existe en la aplicación",
            });
          } else {
            throw err;
          }
        }
        res.redirect("/");
      });
    });
  };

  viewOneRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_isdeleted = 0`;
    let sql_dishes = `SELECT * FROM dish WHERE restaurant_id = ${id} AND dish_isdeleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      connection.query(sql_dishes, (err_dish, result_dish) => {
        if (err_dish) throw err_dish;
        res.render("oneRestaurant", { result, result_dish });
      });
    });
  };

  viewEditRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("editRestaurant", { result });
    });
  };

  editResturant = (req, res) => {
    let id = req.params.id;
    const { restaurant_name, style, restaurant_description, phone_number } =
      req.body;
    /*
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (
        restaurant_name.length > 50 ||
        style.length > 25 ||
        restaurant_description.length > 200 ||
        phone_number.length > 20
      ) {
        return res.render(`editRestaurant`, {
          result,
          message: "LIMITE SUPERADO EN ALGUNO DE LOS CAMPOS",
        });
      }
    });
    */

    let sql = `UPDATE restaurant SET restaurant_name ="${restaurant_name}", style = "${style}", restaurant_description = "${restaurant_description}", phone_number = "${phone_number}" WHERE restaurant_id = ${id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE restaurant SET restaurant_name ="${restaurant_name}", style = "${style}", restaurant_description = "${restaurant_description}", phone_number = "${phone_number}", restaurant_img = "${img}" WHERE restaurant_id = ${id}`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurants/oneRestaurant/${id}`);
    });
  };

  viewLogin = (req, res) => {
    res.render("loginRestaurant");
  };

  login = (req, res) => {
    const { email, password } = req.body;
    let sql = `SELECT * FROM restaurant WHERE email = "${email}"`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length == 1) {
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (err) throw err;
          if (resultCompare) {
            res.redirect(
              `/restaurants/oneRestaurant/${result[0].restaurant_id}`
            );
          } else {
            res.render("loginRestaurant", { message: "password incorrecta" });
          }
        });
      } else {
        return res.render("loginRestaurant", { message: "email no existe" });
      }
    });
  };

  deleteRestaurantLogic = (req, res) => {
    let id = req.params.id;
    console.log(id);
    let sql = `UPDATE restaurant LEFT JOIN dish ON restaurant.restaurant_id = dish.restaurant_id SET restaurant.restaurant_isdeleted = 1, dish.dish_isdeleted = 1 WHERE restaurant.restaurant_id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  };

  deleteRestaurantPermanent = (req, res) => {
    let id = req.params.id;
    console.log(id);
    let sql = `DELETE FROM restaurant WHERE restaurant_id = ${id}`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  };
}

module.exports = new RestaurantsControllers();
