'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Users', 'avatar', Sequelize.TEXT);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'avatar')
  }
};
