'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('wisudawan', {
      nim: {
        type: Sequelize.STRING(8),
        allowNull: false,
        primaryKey: true
      },
      idHimpunan: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jurusan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      namaLengkap: {
        type: Sequelize.STRING,
        allowNull: false
      },
      namaPanggilan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pasfoto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      judulTA: {
        type: Sequelize.STRING,
        allowNull: false
      },
      funFact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipsSukses: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kotaAsal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tanggalLahir: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      angkatan: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    await queryInterface.createTable('karya', {
      nim: {
        type: Sequelize.STRING(8),
        allowNull: false,
        primaryKey: true,
      },
      karya: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    await queryInterface.createTable('pretasi', {
      nim: {
        type: Sequelize.STRING(8),
        primaryKey: true,
        allowNull: false,
      },
      prestasi: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    await queryInterface.createTable('kontribusi',{
      nim : {
        type : Sequelize.STRING(8),
        allowNull : false,
        primaryKey: true,
      },
      kontribusi : {
        type : Sequelize.STRING,
        allowNull : false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
    await queryInterface.createTable('lembagaNonHMJ', {
      nim : {
        type : Sequelize.STRING(8),
        allowNull : false,
        primaryKey: true,
      },
      lembaga : {
        type : Sequelize.STRING,
        allowNull : false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('wisudawan');
    await queryInterface.dropTable('pretasi');
    await queryInterface.dropTable('kontribusi');
    await queryInterface.dropTable('lembagaNonHMJ');
    await queryInterface.dropTable('karya');
  }
};
