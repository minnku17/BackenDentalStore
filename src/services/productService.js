import db from '../models/index';
const { Op } = require('sequelize');

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
                        status: data.status,
                    });

                    if (data.photo) {
                        await db.Image.create({
                            brand_id: brand.id,
                            photo: data.photo,
                        });
                    }
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
                include: [
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });

            if (res) {
                res.forEach((item) => {
                    if (item.Image) {
                        item.Image.photo = new Buffer(item.Image?.photo, 'base64').toString('binary');
                    }
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

const editBrand = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brand = await db.Brand.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (brand) {
                await db.Brand.update(
                    {
                        title: data.title,
                        status: data.status,
                    },
                    {
                        where: { id: data.id },
                    },
                );

                await db.Image.update(
                    {
                        photo: data.photo,
                    },
                    {
                        where: { brand_id: data.id },
                    },
                );
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
                await db.Image.destroy({
                    where: { brand_id: id },
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
                });

                if (res) {
                    resolve({
                        errCode: 2,
                        errMessage: 'The Category already exists in the system',
                    });
                } else {
                    let res = await db.Category.create({
                        title: data.title,
                        summary: data.summary,
                        photo: data.image,

                        is_parent: data.is_parent,
                        parent_id: data.parent_id,
                        status: data.status,
                    });
                    await db.Image.create({
                        cat_id: res.id,
                        photo: data.image,
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

const getAllCategory = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Category.findAll({
                raw: false,
                limit: limit,
                attributes: ['id', 'title', 'is_parent', 'parent_id', 'status'],

                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });

            if (res) {
                res.forEach((item) => {
                    if (item.Image.photo) {
                        item.Image.photo = new Buffer(item.Image.photo, 'base64').toString('binary');
                    }
                });

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
const getAllCategoryAdmin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Category.findAll({
                raw: false,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });

            if (res) {
                res.forEach((item) => {
                    if (item.Image.photo) {
                        item.Image.photo = new Buffer(item.Image.photo, 'base64').toString('binary');
                    }
                });

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
const getAllParentCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCat = await db.Category.findAll({
                where: { is_parent: 1 },
                include: [
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });
            allCat.forEach((item) => {
                if (item.Image.photo) {
                    item.Image.photo = new Buffer(item.Image.photo, 'base64').toString('binary');
                }
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

const editCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Category = await db.Category.findOne({
                where: { id: data.id },
                raw: false,
            });

            if (Category) {
                await db.Category.update(
                    {
                        title: data.title,
                        summary: data.summary,
                        is_parent: data.is_parent,
                        status: data.status,
                        parent_id: data.parent_id,
                    },
                    {
                        where: { id: Category.id },
                    },
                );
                await db.Image.update(
                    {
                        photo: data.image,
                    },
                    {
                        where: { cat_id: data.id },
                    },
                );

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

                await db.Image.destroy({
                    where: { cat_id: id },
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

                        let arrPhoto = [];

                        data.photo.map((item) => {
                            let obj = {};

                            obj.product_id = res.id;
                            obj.photo = item;

                            return arrPhoto.push(obj);
                        });

                        await db.Image.bulkCreate(arrPhoto);

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

                    await db.Image.destroy({
                        where: { product_id: res.id },
                    });
                    let arrPhoto = [];
                    data.photo.map((item) => {
                        let obj = {};

                        obj.product_id = res.id;
                        obj.photo = item;

                        return arrPhoto.push(obj);
                    });

                    await db.Image.bulkCreate(arrPhoto);

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
            let res = await db.Product.findAll({
                raw: false,
                include: [
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });

            if (res) {
                if (res.Images) {
                    res.forEach((item) => {
                        item.Images.map((item) => {
                            return (item.photo = new Buffer(item.photo, 'base64').toString('binary'));
                        });
                    });
                }
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

const getAllProductHome = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Product.findAll({
                attributes: ['id', 'title', 'price', 'sold', 'discount', 'unit_of_product'],
                include: [
                    {
                        model: db.Brand,
                        attributes: ['title'],
                    },
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });

            if (res) {
                // res.forEach((item) => {
                //     return (item.photo = new Buffer(item.photo, 'base64').toString('binary'));
                // });
                let arr = [];
                res.map((item) => {
                    let productData = {};
                    let imageR = new Buffer(item.Images[0].photo, 'base64').toString('binary');
                    productData.brand = item.Brand?.title;
                    productData.image = imageR;
                    productData.discount = item.discount;
                    productData.id = item.id;
                    productData.price = item.price;
                    productData.sold = item.sold;
                    productData.title = item.title;
                    productData.unit = item.unit_of_product;

                    arr.push(productData);

                    resolve({
                        errCode: 0,
                        data: arr,
                    });
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
const getProductInfoAdminById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Product.findOne({
                where: { id: id },
                // attributes: ['title', ''],
                include: [
                    {
                        model: db.Markdown,
                    },
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });

            if (!res) {
                resolve({
                    errCode: 1,
                    errMessage: 'Product not exist:!!!',
                });
            } else {
                if (res.Images) {
                    res.Images.forEach((item) => {
                        item.photo = new Buffer(item.photo, 'base64').toString('binary');
                    });
                }
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
const getProductInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await db.Product.findOne({
                where: { id: id },

                include: [
                    {
                        model: db.Brand,
                        attributes: ['title'],
                    },
                    {
                        model: db.Category,
                        attributes: ['title'],
                    },

                    {
                        model: db.Markdown,
                        attributes: ['descriptionHtml', 'specificationHtml', 'featureHtml', 'assignHtml'],
                    },
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            });

            let user = await db.User.findAll({
                where: { review_id: id },
                attributes: ['firstName', 'lastName'],
                include: [
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                    {
                        model: db.Review,
                        attributes: ['id', 'rate', 'title', 'description', 'status'],
                    },
                ],
            });

            user.map((item) => {
                if (item.Image.photo) {
                    item.Image.photo = new Buffer(item.Image.photo, 'base64').toString('binary');
                }
            });

            let arrUser = [];
            if (user) {
                let obj = {};
            }

            let dataProduct = {};
            dataProduct.dataProduct = res;
            dataProduct.InfoUserReview = user;

            if (!res) {
                resolve({
                    errCode: 1,
                    errMessage: 'Product not exist:!!!',
                });
            } else {
                if (res.Images) {
                    res.Images.forEach((item) => {
                        item.photo = new Buffer(item.photo, 'base64').toString('binary');
                    });
                }

                resolve({
                    errCode: 0,
                    data: dataProduct,
                });
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const handleReviewProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Review.create({
                user_id: data.user_id,
                product_id: data.product_id,
                rate: data.rate,
                title: data.title,
                description: data.description,
                status: true,
            });

            await db.User.update(
                {
                    review_id: data.product_id,
                },
                {
                    where: { id: data.user_id },
                },
            );

            resolve({
                errCode: 0,
                errMessage: 'Cảm ơn bạn đã đánh giá! ',
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

const handleSearchProduct = (q) => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = {
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: '%' + q + '%' } },
                        // { '$Product.body$': { [Op.like]: '%' + query + '%' } },
                    ],
                },
                attributes: ['id', 'title'],
                include: [
                    {
                        model: db.Image,
                        attributes: ['photo'],
                    },
                ],
            };

            let res = await db.Product.findAll(options);

            if (res) {
                res.map((item) => {
                    item.Images[0].photo = new Buffer(item.Images[0].photo, 'base64').toString('binary');
                });

                let dataSearch = [];

                res.forEach((item) => {
                    let obj = {};
                    obj.id = item.id;
                    obj.title = item.title;
                    obj.photo = item.Images[0].photo;

                    dataSearch.push(obj);
                });

                resolve({
                    errCode: 0,
                    data: dataSearch,
                });
            } else {
                console.log('lõi');
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
    getAllCategoryAdmin,
    editCategory,
    handleDeleteCategory,
    getAllParentCategory,
    saveDetailProduct,
    handleDeleteProduct,
    getAllProduct,
    getProductInfoAdminById,
    getProductInfoById,
    handleSearchProduct,
    getAllProductHome,
    handleReviewProduct,
};
