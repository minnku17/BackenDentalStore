'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Markdown.init(
        {
            user_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            descriptionHtml: DataTypes.STRING,
            descriptionMarkdown: DataTypes.STRING,
            specificationHtml: DataTypes.STRING,
            specificationMarkdown: DataTypes.STRING,
            featureHtml: DataTypes.STRING,
            featureMarkdown: DataTypes.STRING,
            assignHtml: DataTypes.STRING,
            assignMarkdown: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Markdown',
        },
    );
    return Markdown;
};
