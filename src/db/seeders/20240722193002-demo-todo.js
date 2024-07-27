'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
        `SELECT id from "Users";`
    );

    const userRows = users[0];

    await queryInterface.bulkInsert('Todos', [
      {
        title: 'Buy groceries',
        description: 'Milk, Bread, Butter, Eggs',
        completed: false,
        userId: userRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Read a book',
        description: 'Finish reading "1984" by George Orwell',
        completed: false,
        userId: userRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Write blog post',
        description: 'Write a new blog post about Node.js',
        completed: false,
        userId: userRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Exercise',
        description: 'Go for a run in the park',
        completed: false,
        userId: userRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cook dinner',
        description: 'Prepare a healthy meal',
        completed: false,
        userId: userRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
