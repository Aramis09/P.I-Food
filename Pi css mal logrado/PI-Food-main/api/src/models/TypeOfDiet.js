const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('TypeOfDiet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    },
        {
        timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 

    }
  );
};