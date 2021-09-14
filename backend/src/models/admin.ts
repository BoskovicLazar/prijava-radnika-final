'use strict';

import {
  Model,
  UUIDV4,
} from 'sequelize';

interface AdminAttributes {
  id: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Admin extends Model implements AdminAttributes {
    id!: string;
    username!: string;
    password!: string;
    firstName!: string;
    lastName!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  };

  Admin.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Admin',
  });

  return Admin;
};
