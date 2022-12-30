const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore:{
      type: DataTypes.FLOAT, 
    },
    steps:{
      type: DataTypes.TEXT,
    }
  } ,
      {
    timestamps: false, // sacamos las dos ultimas columnas que muestran las fechas y hora modificaciones 
}
  );
};
