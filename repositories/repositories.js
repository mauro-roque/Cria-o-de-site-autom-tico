const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const InfoWebsiteModel = require('../models/InfoWebsite');

const sequelize = new Sequelize("proj_spectra", "root", "1234", {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});

/**
 * Funções de manipulação de dados que vou precisar:
 * 1. CreatewebSite: Registra os dados usados no form e insere na tabela info_website;
 * 2. InsertHtmlDominio: insere o retorno do html com o dominio na tabela technical_info;
 * 3. ConsultaOSite: Vai ser uma class onde vai conter varias funções de consulta
 */

const InfoWebsite = InfoWebsiteModel(sequelize, DataTypes);
async function createwebSite(dadaWebSite) {
  try {
    const novoSite = await InfoWebsite.create({
      nome_site: dadaWebSite.nome_site,
      sobre_site: dadaWebSite.sobre_site,
      email_site: dadaWebSite.email_site,
      telefone_site: dadaWebSite.telefone_site,
      endereco_site: dadaWebSite.endereco_site
    });

    console.log("Site inserido com sucesso! ID:", novoSite.id_infowebsite);

    return novoSite.id_infowebsite;
  } catch (error) {
    console.error("Erro ao inserir o site:", error);
    throw error;
  }
}

async function insertHtmlDominio(dadaWebSite) {
  try {
    await sequelize.query(`
      INSERT INTO technical_info 
      (html_gerado, local_gerado_url, site_on, fk_info_website)
      VALUES
      (:html_gerado, :local_gerado_url, :site_on, :fk_info_website)
    `, {
      replacements: {
        html_gerado: dadaWebSite.html_gerado,  
        local_gerado_url: dadaWebSite.local_gerado_url,
        site_on: dadaWebSite.site_on,         // booleano ou 1/0
        fk_info_website: dadaWebSite.fk_info_website // ID do site relacionado
      },
      type: sequelize.QueryTypes.INSERT
    });

    console.log("Dados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir dados do site:", error);
    throw new Error("Error: " + error);
  }
}

module.exports = {
    createwebSite,
    insertHtmlDominio,
    sequelize,
    InfoWebsite,
}

sequelize.authenticate()
    .then(() => console.log("Conectado com sucesso!"))
    .catch(err => console.error("Falha ao se conectar:", err));

sequelize.sync({ force: false })
  .then(() => console.log("Banco de dados sincronizado!"))
  .catch(err => console.error("Erro ao sincronizar banco de dados:", err));
  