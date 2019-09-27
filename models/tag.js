'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  class Tag extends Model{

  }


  Tag.init({
    name: DataTypes.STRING
  },{sequelize , modelName:"Tag"})


  Tag.associate = function(models) {
    // associations can be defined here
  };
  return Tag;
};