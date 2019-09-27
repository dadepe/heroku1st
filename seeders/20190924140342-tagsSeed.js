'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Tags', [{
        name: 'Adventure',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Cooking',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Gaming',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Photography',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Writing',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Drawing',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Programming',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Sporty',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Martial Arts',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Automotive',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Reading',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Music',
        createdAt : new Date(),
        updatedAt : new Date()
      },{
        name: 'Eating',
        createdAt : new Date(),
        updatedAt : new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Tags', null, {});
    
  }
};
