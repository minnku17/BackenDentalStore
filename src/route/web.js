import express from 'express';
import homeController from '../controller/homeController';
import userController from '../controller/userController';
import authController from '../controller/authController';
import productController from '../controller/productController';
import middlewareController from '../controller/middlewareController';
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    //authenticate
    router.post(
        '/api/register',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        authController.registerUser,
    );
    //create a customer
    router.post(
        '/api/registerCustomer',

        userController.registerCustomer,
    );
    router.post('/api/login', authController.handleLogin);
    middlewareController.verifyToken,
        router.post('/api/logout', middlewareController.verifyToken, authController.handleLogout);

    //refreshToken

    router.post('/api/refreshToken', authController.handleRefreshToken);

    //User

    router.get('/api/getAllUsers', middlewareController.verifyToken, userController.handleGetAllUsers);

    router.get('/api/getUserInfoById', middlewareController.verifyToken, userController.handleGetUserInfoById);
    router.delete(
        '/api/deleteUser',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        userController.handleDeleteUser,
    );
    router.put(
        '/api/editUser',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        userController.handleEditUser,
    );

    //Api product

    //Brands product
    router.post(
        '/api/createNewBrand',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.createNewBrand,
    );
    router.get(
        '/api/getAllBrands',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.getAllBrands,
    );
    router.put(
        '/api/editBrand',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.editBrand,
    );
    router.delete(
        '/api/deleteBrand',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.handleDeleteBrand,
    );

    //Category API
    router.post(
        '/api/createNewCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.createNewCategory,
    );
    router.get(
        '/api/getAllCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.getAllCategory,
    );
    router.get(
        '/api/getAllParentCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.getAllParentCategory,
    );
    router.put(
        '/api/editCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.editCategory,
    );
    router.delete(
        '/api/deleteCategory',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.handleDeleteCategory,
    );

    //Product API
    router.post(
        '/api/createNewProduct',
        // middlewareController.verifyToken,
        // middlewareController.verifyTokenAndAdminAuth,
        productController.saveDetailProduct,
    );
    router.delete(
        '/api/deleteProduct',

        productController.handleDeleteProduct,
    );
    router.get(
        '/api/getAllProduct',

        productController.getAllProduct,
    );

    return app.use('/', router);
};

module.exports = initWebRoutes;
