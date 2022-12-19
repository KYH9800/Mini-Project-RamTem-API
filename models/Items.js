'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.hasMany(models.Comments, { foreignKey: 'itemId' });
      this.hasOne(models.ItemImages, { foreignKey: 'itemId' });
    }
  }
  Items.init(
    {
      itemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Users 테이블에
          key: 'userId', // userId column 과 관계를 맺음
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Items',
    }
  );
  return Items;
};
