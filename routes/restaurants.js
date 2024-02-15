var express = require('express');
var router = express.Router();
const uploadImage = require("../middlewares/multer");
const restaurantsControllers = require("../controllers/restaurantsControllers");


//ENTRADA POR LOCALHOST:3000/restaurants
// INUTILIZADA DE MOMENTO
router.get('/', restaurantsControllers.viewRestaurants);

// ABRE PAGINA DE REGISTRO DE RESTAURANTES
router.get("/registerRestaurant", restaurantsControllers.viewRegisterRestaurant);

// RECOGE LOS DATOS DEL FORMULARIO DE REGISTRO DEL RESTAURANTE
router.post(
  "/registerRestaurant",
  uploadImage("restaurants"),
  restaurantsControllers.createRestaurant
);

//ABRE LA PAGINA DE UN RESTAURANTE CON TODOS SUS PLATOS
router.get("/oneRestaurant/:id", restaurantsControllers.viewOneRestaurant);

//ABRE EL FORMULARIO DE EDICION DE UN RESTAURANTE
router.get("/editRestaurant/:id", restaurantsControllers.viewEditRestaurant);

//RECOGE LOS DATOS DEL FORMULARIO DE EDICION DEL RESTAURANTE
router.post(
  "/editRestaurant/:id",
  uploadImage("restaurants"),
  restaurantsControllers.editResturant
);

//ABRE EL FORMULARIO DE LOGIN DE UN RESTAURANTE
router.get("/loginRestaurant", restaurantsControllers.viewLogin);

//RECOGE LA INFO DEL FORMULARIO DEL LOGIN
router.post("/loginRestaurant", restaurantsControllers.login);

//ELIMINA LA INFO DE UN RESTAURANTE DE FORMA LOGICA
router.get(
  "/deleteRestaurantLogic/:id",
  restaurantsControllers.deleteRestaurantLogic
);

//BORRADO PERMANENTE DE UN RESTAURANTE
router.get(
  "/deleteRestaurantPermanent/:id/",
  restaurantsControllers.deleteRestaurantPermanent
);

module.exports = router;
