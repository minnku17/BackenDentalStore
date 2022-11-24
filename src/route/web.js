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
    router.post('/api/login', authController.handleLogin);

    router.get('/api/logout', middlewareController.verifyToken, authController.handleLogout);
    //create a customer
    router.post(
        '/api/registerCustomer',

        userController.registerCustomer,
    );

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
        '/api/getAllCategoryAdmin',
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
        productController.getAllCategoryAdmin,
    );

    router.get('/api/getAllParentCategory', productController.getAllParentCategory);
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
        middlewareController.verifyToken,
        middlewareController.verifyTokenAndAdminAuth,
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
    router.get(
        '/api/getAllProductHome',

        productController.getAllProductHome,
    );
    router.get(
        '/api/getProductInfoAdminById',

        productController.getProductInfoAdminById,
    );
    router.get(
        '/api/getProductInfoById',

        productController.getProductInfoById,
    );
    router.post(
        '/api/handleReviewProduct',

        productController.handleReviewProduct,
    );

    //customer

    router.get(
        '/api/getAllCategory',

        productController.getAllCategory,
    );

    //test api search
    router.get('/api/search-product', productController.handleSearchProduct);

    return app.use('/', router);
};

module.exports = initWebRoutes;
