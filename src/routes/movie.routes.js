const express = require("express");
const router = express.Router();

const controller = require("../controllers/movie.controller");
const authMiddleWare = require("../middlewares/auth.middleware");
const checkUserRole = require("../middlewares/checkUserRole")

router.get("/", controller.getAllMovies);
router.post("/", authMiddleWare, checkUserRole("admin") ,controller.createMovie);
router
  .route("/:id")
  .get(authMiddleWare , controller.getSingleMovie)
  .delete(authMiddleWare , checkUserRole("admin") ,controller.deleteMovie)
  .patch(authMiddleWare , checkUserRole("admin") ,controller.editMovie);

router.patch("/like/:id" ,authMiddleWare , controller.addLike)
router.patch("/unlike/:id" ,authMiddleWare , controller.unLike)

module.exports = router;
