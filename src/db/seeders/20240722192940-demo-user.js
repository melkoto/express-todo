'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bob Brown',
        email: 'bob@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Charlie Davis',
        email: 'charlie@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
