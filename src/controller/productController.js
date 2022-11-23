import productService from '../services/productService';

//Controller Brand
const createNewBrand = async (req, res) => {
    try {
        let response = await productService.createNewBrand(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getAllBrands = async (req, res) => {
    try {
        let response = await productService.getAllBrands();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const editBrand = async (req, res) => {
    try {
        let response = await productService.editBrand(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const handleDeleteBrand = async (req, res) => {
    try {
        let response = await productService.handleDeleteBrand(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

//Controller Category
const createNewCategory = async (req, res) => {
    try {
        let response = await productService.createNewCategory(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getAllParentCategory = async (req, res) => {
    try {
        let response = await productService.getAllParentCategory();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getAllCategory = async (req, res) => {
    try {
        let response = await productService.getAllCategory();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const editCategory = async (req, res) => {
    try {
        let response = await productService.editCategory(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const handleDeleteCategory = async (req, res) => {
    try {
        let response = await productService.handleDeleteCategory(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const saveDetailProduct = async (req, res) => {
    try {
        let response = await productService.saveDetailProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const handleDeleteProduct = async (req, res) => {
    try {
        let response = await productService.handleDeleteProduct(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        let response = await productService.getAllProduct();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

const getProductInfoById = async (req, res) => {
    try {
        let response = await productService.getProductInfoById(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const handleSearchProduct = async (req, res) => {
    try {
        let response = await productService.handleSearchProduct(req.query.q);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};
const getAllProductHome = async (req, res) => {
    try {
        let response = await productService.getAllProductHome();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        });
    }
};

module.exports = {
    createNewBrand,
    getAllBrands,
    editBrand,
    handleDeleteBrand,
    createNewCategory,
    getAllCategory,
    editCategory,
    handleDeleteCategory,
    getAllParentCategory,
    saveDetailProduct,
    handleDeleteProduct,
    getAllProduct,
    getProductInfoById,
    handleSearchProduct,
    getAllProductHome,
};
