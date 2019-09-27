'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'description', Sequelize.STRING);
},

down: (queryInterface, Sequelize) => {
  return queryInterface.removeColumn('Users', 'description')
}
};
