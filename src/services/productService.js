import db from '../models/index';

//Brand
const createNewBrand = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title || !data.status) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters!!!',
                });
            } else {
                let res = await db.Brand.findOne({
                    where: { title: data.title },
                    raw: true,
                });
                if (res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'The brand already exists in the system',
                    });
                } else {
                    let brand = await db.Brand.create({
                        title: data.title,
                        photo: data.photo,
                        status: data.status,
                    });

                    resolve({
                        errCode: 0,
                        errMessage: 'Create brand successfully!!!',
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllBrands = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Brand.findAll({
                raw: true,
            });
            if (res) {
                resolve({
                    errCode: 0,
                    data: res,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const editBrand = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brand = await db.Brand.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (brand) {
                (brand.title = data.title), (brand.photo = data.photo), (brand.status = data.status);
                await brand.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update brand successfully!!!',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Brand not found!!!',
                });
            }
        } catch (e) {
            console.log('check', e);
            reject(e);
        }
    });
};

const handleDeleteBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Brand.findOne({
                where: { id: id },
            });
            console.log('check res tu delete', res);
            if (res) {
                await db.Brand.destroy({
                    where: { id: id },
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Delete brand successfully!!!',
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

//Category

const getAllParentCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCat = await db.Category.findAll({
                where: { is_parent: 1 },
            });
            resolve({
                errCode: 0,
                data: allCat,
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const createNewCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title || !data.status) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters!!!',
                });
            } else {
                let res = await db.Category.findOne({
                    where: { title: data.title },
                    raw: true,
                });
                if (res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'The Category already exists in the system',
                    });
                } else {
                    await db.Category.create({
                        title: data.title,
                        summary: data.summary,
                        is_parent: data.is_parent,
                        parent_id: data.parent_id,
                        status: data.status,
                    });

                    resolve({
                        errCode: 0,
                        errMessage: 'Create Category successfully!!!',
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Category.findAll({
                raw: true,
            });
            if (res) {
                resolve({
                    errCode: 0,
                    data: res,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const editCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Category = await db.Category.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (Category) {
                (Category.title = data.title),
                    (Category.summary = data.summary),
                    (Category.is_parent = data.is_parent),
                    (Category.status = data.status),
                    (Category.parent_id = data.parent_id);
                await Category.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update Category successfully!!!',
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Category not found!!!',
                });
            }
        } catch (e) {
            console.log('check', e);
            reject(e);
        }
    });
};

const handleDeleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Category.findOne({
                where: { id: id },
            });
            console.log('check res tu delete', res);
            if (res) {
                await db.Category.destroy({
                    where: { id: id },
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Delete Category successfully!!!',
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
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
};
