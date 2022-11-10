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
            if (res) {
                await db.Product.update(
                    {
                        brand_id: null,
                    },
                    {
                        where: { brand_id: res.id },
                    },
                );
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
            if (res) {
                await db.Product.update(
                    {
                        cat_id: null,
                    },
                    {
                        where: { cat_id: res.id },
                    },
                );
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
// const checkRequiredFields = (data) => {
//     let arrFields = [
//         'title',
//         'summary',
//         'description',
//         'photo',
//         'price',
//         'catId',
//         'brandId',
//         'discount',
//         'stock',
//         'condition',
//         'status',
//     ];
//     let isValid = true;
//     let element;
//     for (let i = 0; i < arrFields.length; i++) {
//         if (!data[arrFields[i]]) {
//             isValid = false;
//             element = arrFields[i];
//         }
//     }

//     return {
//         isValid,
//         element,
//     };
// };
const saveDetailProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.title ||
                !data.unit_of_product ||
                !data.photo ||
                !data.stock ||
                !data.price ||
                !data.condition ||
                !data.status ||
                !data.brand_id ||
                !data.cat_id ||
                !data.action
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required',
                });
            } else {
                let product = await db.Product.findOne({
                    where: { title: data.title },
                });
                if (data.action === 'CREATE') {
                    if (product) {
                        resolve({
                            errCode: 1,
                            errMessage: 'Product already exists in the system!!!',
                        });
                    } else {
                        let res = await db.Product.create({
                            cat_id: data.cat_id,
                            brand_id: data.brand_id,
                            title: data.title,
                            photo: data.photo,
                            type: data.type,
                            stock: data.stock,
                            unit_of_product: data.unit_of_product,
                            expiry: data.expiry,
                            price: data.price,
                            discount: data.discount,
                            condition: data.condition,
                            status: data.status,
                        });

                        await db.Markdown.create({
                            product_id: res.id,
                            descriptionHtml: data.descriptionHtml,
                            descriptionMarkdown: data.descriptionMarkdown,
                            specificationHtml: data.specificationHtml,
                            specificationMarkdown: data.specificationMarkdown,
                            featureHtml: data.featureHtml,
                            featureMarkdown: data.featureMarkdown,
                            assignHtml: data.assignHtml,
                            assignMarkdown: data.assignMarkdown,
                        });

                        resolve({
                            errCode: 0,
                            errMessage: 'Create product successfully',
                        });
                    }
                }
                if (data.action === 'EDIT') {
                    let res = await db.Product.findOne({
                        where: { id: data.id },
                    });
                    if (res) {
                        res.cat_id = data.cat_id;
                        res.brand_id = data.brand_id;
                        res.title = data.title;
                        res.photo = data.photo;
                        res.type = data.type;
                        res.stock = data.stock;
                        res.unit_of_product = data.unit_of_product;
                        res.expiry = data.expiry;
                        res.price = data.price;
                        res.discount = data.discount;
                        res.condition = data.condition;
                        res.status = data.status;
                        await res.save();
                    }

                    let productMarkdown = await db.Markdown.findOne({
                        where: { product_id: res.id },
                    });

                    if (productMarkdown) {
                        productMarkdown.descriptionHtml = data.descriptionHtml;
                        productMarkdown.descriptionMarkdown = data.descriptionMarkdown;
                        productMarkdown.specificationHtml = data.specificationHtml;
                        productMarkdown.specificationMarkdown = data.specificationMarkdown;
                        productMarkdown.featureHtml = data.featureHtml;
                        productMarkdown.featureMarkdown = data.featureMarkdown;
                        productMarkdown.assignHtml = data.assignHtml;
                        productMarkdown.assignMarkdown = data.assignMarkdown;
                        await productMarkdown.save();
                    }

                    resolve({
                        errCode: 0,
                        errMessage: 'Edit product successfully',
                    });
                }
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
const handleDeleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Product.findOne({
                where: { id: id },
            });

            if (res) {
                await db.Markdown.destroy({
                    where: { product_id: id },
                });
                await db.Product.destroy({
                    where: { id: id },
                });
                resolve({
                    errCode: 0,
                    errMessage: 'Delete product successfully!!!',
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Product.findAll();

            if (res) {
                res.forEach((item) => {
                    return (item.photo = new Buffer(item.photo, 'base64').toString('binary'));
                });
                resolve({
                    errCode: 0,
                    data: res,
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
    saveDetailProduct,
    handleDeleteProduct,
    getAllProduct,
};
