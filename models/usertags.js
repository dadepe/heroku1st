'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class UserTags extends Model{

  }

  UserTags.init({
    UserId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {sequelize, modelName : "UserTags"})

  UserTags.associate = function(models) {
    models.User.belongsToMany(models.Tag, {through: 'UserTags'});
    models.Tag.belongsToMany(models.User, {through: 'UserTags'});
  };
  return UserTags;
};