'use strict';

import {
  Model,
  UUIDV4,
} from 'sequelize';

interface EmployeeAttributes {
  id: string;
  barcode: string;
  firstName: string;
  lastName: string;
  archived: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Employee extends Model implements EmployeeAttributes {
    id!: string;
    barcode!: string;
    firstName!: string;
    lastName!: string;
    archived!: boolean;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Employee.hasMany(models.Time, {
      });
    }
  };

  Employee.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Employee',
  });

  return Employee;
};
