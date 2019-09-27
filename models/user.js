'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const hash = require("../helpers/hashPassword")
  
  class User extends Model{

  }

  User.init({
    UserName: DataTypes.STRING,
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: {type:DataTypes.STRING,validate:{
        isEmail:true, emailUniq(Email){
          return User.findOne({
            where:{
              Email:Email
            }
          })
          .then(user=>{
            if(user) throw new Error('Invalid Email/ Email is already been taken')
          })
        }
    }},
    Address: DataTypes.STRING,
    Birthday: DataTypes.STRING,
    Password: DataTypes.STRING,
    LocationId: DataTypes.INTEGER,
    salt: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    description: DataTypes.STRING
  },
  {
    hooks:{
      beforeCreate(instance, options){
        let random = String(Math.random()*10000)
        instance.setDataValue("Password", hash(instance.Password, random))
        instance.setDataValue("salt",  random)
      }
  },sequelize, modelName : "User"})

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};