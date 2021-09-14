'use strict';

import {
  Model,
  UUIDV4,
} from 'sequelize';

interface TimeAttributes {
  id: string;
  EmployeeId: string;
  entry: Date;
  exit: Date;
  open: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Time extends Model implements TimeAttributes {
    id!: string;
    EmployeeId!: string;
    entry!: Date;
    exit!: Date;
    total!: number;
    open!: boolean;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Time.belongsTo(models.Employee, {
      });
    }
  };

  Time.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    EmployeeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    entry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    exit: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Time',
  });

  return Time;
};
