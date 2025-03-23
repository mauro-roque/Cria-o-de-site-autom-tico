const { sequelize } = require('../repositories/repositories');

class ConsultaOSite {
  // Trazer todos os dados de info_website
  async selectFromTodosInfo_website() {
    try {
      const [results, metadata] = await sequelize.query(`SELECT * FROM info_website;`);
      console.log("Sucesso GET - Info_website todos dados");
      //console.log(results); 
      return results; 
    } catch (error) {
      console.error("Erro: trazer todos os dados info_website:", error);
      throw new Error("Error: " + error);
    }
  }

  // Trazer todos os dados de technical_info
  async selectFromTodosTechnical_info() {
    try {
      const [results, metadata] = await sequelize.query(`SELECT * FROM technical_info;`);
      console.log("Sucesso GET - technical_info todos dados");
      //console.log(results); 
      return results; 
    } catch (error) {
      console.error("Erro: trazer todos os dados technical_info:", error);
      throw new Error("Error: " + error);
    }
  }

  // Trazer por id info_website
  async selectPorIdInfo_website(id) {
    try {
      const [results, metadata] = await sequelize.query(`SELECT * FROM info_website WHERE id_infowebsite = ${id};`);
      console.log("Sucesso GET - info_website por id");
      //console.log(results); 
      return results; 
    } catch (error) {
      console.error("Erro: trazer todos os dados por id info_website:", error);
      throw new Error("Error: " + error);
    }
  }

  // Trazer por id technical_info
  async selectPorIdTechnical_info(id) {
    try {
      const [results, metadata] = await sequelize.query(`SELECT * FROM technical_info WHERE id_info_tec = ${id};`);
      console.log("Sucesso GET - technical_info por id");
      //console.log(results);
      return results; 
    } catch (error) {
      console.error("Erro: trazer todos os dados por id technical_info:", error);
      throw new Error("Error: " + error);
    }
  }

  // Trazer todos os dados com junção (info_website e technical_info)
  async selectInnerJoinTodosDados() {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT * FROM info_website iw INNER JOIN technical_info ti ON iw.id_infowebsite = ti.fk_info_website;`
      );
      console.log("Sucesso GET - Dados junção info_website e technical_info");
      //console.log(results); 
      return results; 
    } catch (error) {
      console.error("Erro: trazer todos os dados com junção:", error);
      throw new Error("Error: " + error);
    }
  }

  // Trazer dados com junção por id
  async selectInnerJoinPorId(id) {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT * FROM info_website iw INNER JOIN technical_info ti ON iw.id_infowebsite = ti.fk_info_website WHERE iw.id_infowebsite = ${id};`
      );
      console.log("Sucesso GET - Dados junção por id");
      //console.log(results);
      return results; 
    } catch (error) {
      console.error("Erro: trazer dados com junção por id:", error);
      throw new Error("Error: " + error);
    }
  }

  async ultimoWebSiteCriado() {
    try {
      const [results, metadata] = await sequelize.query(`SELECT html_gerado FROM technical_info ORDER BY id_info_tec DESC LIMIT 1;`);
      console.log("Sucesso GET - ult site criado");
      //console.log(results);
      return results; 
    } catch (error) {
      console.error("Erro: trazer dados com junção por id:", error);
      throw new Error("Error: " + error);
    }
  }
}

module.exports = {
  ConsultaOSite,
};
