const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  var id = 1
  sequelize.define('videogame', {
    id: {
      type: DataTypes.STRING,
      defaultValue: function () { return `henry-${id++}` },
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    platform: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  });
};
