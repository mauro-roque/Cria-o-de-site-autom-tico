// models/InfoWebsite.js
module.exports = (sequelize, DataTypes) => {
    const InfoWebsite = sequelize.define('InfoWebsite', {
      id_infowebsite: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome_site: {
        type: DataTypes.STRING(35),
        allowNull: true
      },
      sobre_site: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email_site: {
        type: DataTypes.STRING(80),
        allowNull: true
      },
      telefone_site: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      endereco_site: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    }, {
      tableName: 'info_website', // Nome exato da tabela no banco
      timestamps: false // Desabilita createdAt e updatedAt
    });
  
    return InfoWebsite;
  };
  