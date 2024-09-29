"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        { id: 1, name: "client", createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: "admin", createdAt: new Date(), updatedAt: new Date() },
        { id: 3, name: "owner", createdAt: new Date(), updatedAt: new Date() },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {},
};
