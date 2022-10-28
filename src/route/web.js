import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import authController from "../controller/authController";
import middlewareController from "../controller/middlewareController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //authenticate
  router.post("/api/register", authController.registerUser);
  router.post("/api/login", authController.handleLogin);
  middlewareController.verifyToken,
    router.post("/api/logout", authController.handleLogout);

  //refreshToken

  router.post("/api/refreshToken", authController.handleRefreshToken);

  //User

  router.get(
    "/api/getAllUsers",
    middlewareController.verifyToken,
    userController.handleGetAllUsers
  );
  router.delete(
    "/api/deleteUser",
    middlewareController.verifyToken,
    middlewareController.verifyTokenAndAdminAuth,
    userController.handleDeleteUser
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;
