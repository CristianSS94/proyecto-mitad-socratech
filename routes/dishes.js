var express = require("express");
var router = express.Router();
const dishesControllers = require("../controllers/dishesControllers");
const uploadImage = require("../middlewares/multer");

//ENTRADA POR LOCALHOST:3000/dishes
// INUTILIZADA DE MOMENTO
router.get("/", dishesControllers.viewRestaurants);

//ABRE EL FORMULARIO DE REGISTRO DE UN PLATO DENTRO DEL RESTAURANTE AL QUE PERTENECE
router.get("/registerDish/:id", dishesControllers.viewRegisterDish);

//RECOGE LOS DATOS DEL PLATO CREADO Y LO AÑADE AL RESTAURANTE
router.post(
  "/registerDish/:id",
  uploadImage("dishes"),
  dishesControllers.registerDish
);

//ABRE EL FORMULARIO DE EDICION DE UN PLATO DENTRO DEL RESTAURANTE AL QUE PERTENECE
router.get("/editDish/:id/:restaurant_id", dishesControllers.viewEditDish);

//RECOGE LOS DATOS DEL FORMULARIO DE EDICION DE UN PLATO
router.post(
  "/editDish/:id/:restaurant_id",
  uploadImage("dishes"),
  dishesControllers.editDish
);

//BORRADO PERMANENTE DE UN PLATO
router.get(
  "/deleteDishPermanent/:id/:restaurant_id",
  dishesControllers.deleteDishPermanent
);

//BORRADO LOGICO DE UN PLATO
router.get(
  "/deleteDishLogic/:id/:restaurant_id",
  dishesControllers.deleteDishLogic
);

module.exports = router;
