'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Items, { foreignKey: 'userId' });
      this.hasMany(models.Comments, { foreignKey: 'userId' });
      this.hasOne(models.Images, { foreignKey: 'userId' });
    }
  }

  Users.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
