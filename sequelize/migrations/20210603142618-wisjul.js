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
      idJurusan: {
        type: Sequelize.INTEGER,
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
        unique: true,
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
        allowNull: false,
        unique: true
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
    });
    await queryInterface.createTable('karya', {
      nim: {
        type: Sequelize.STRING(8),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'wisudawan',
          key: 'nim',
        }
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
        references: {
          model: 'wisudawan',
          key: 'nim',
        }
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
        references: {
          model: 'wisudawan',
          key: 'nim'
        }
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
        references: {
          model: 'wisudawan',
          key: 'nim',
        }
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
    await queryInterface.createTable('himpunan', {
      idHimpunan: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      namaHimpunan: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      singkatanHimpunan: {
        type: Sequelize.STRING(16),
        unique: true,
        allowNull: false,
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
    await queryInterface.createTable('jurusan', {
      idJurusan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      namaJurusan: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      idHimpunan: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        references: {
          model: 'himpunan',
          key: 'idHimpunan'
        }
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
    await queryInterface.createTable('pesan', {
      nim: { // penerima
        type: Sequelize.STRING(8),
        allowNull: false,
        comment: 'Penerima pesan',
        references: {
          model: 'wisudawan',
          key: 'nim',
        }
      },
      namaPengirim: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pesan: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('pretasi');
    await queryInterface.dropTable('kontribusi');
    await queryInterface.dropTable('lembagaNonHMJ');
    await queryInterface.dropTable('karya');
    await queryInterface.dropTable('wisudawan');
    await queryInterface.dropTable('himpunan');
    await queryInterface.dropTable('jurusan');
    await queryInterface.dropTable('pesan');
  }
};
