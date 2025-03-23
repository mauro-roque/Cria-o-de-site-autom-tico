const ModelWebSite = require("../models/ModelWebSite.js");
const ModelRegistroHtmlDominio = require("../models/ModelRegistroHtmlDominio.js");
const {createwebSite, insertHtmlDominio} = require("../repositories/repositories.js");


class Service {

    static validarDados(dados) {
      //console.log(dados)
      if (!dados.nome_site || typeof dados.nome_site !== 'string') {
        throw new Error("Erro: nome_site");
      }
      if (!dados.sobre_site || typeof dados.sobre_site !== 'string') {
        throw new Error("Erro: sobre_site");
      }
      if (!dados.email_site || typeof dados.email_site !== 'string') {
        throw new Error("Erro: email_site");
      }
      if (!dados.telefone_site || typeof dados.telefone_site !== 'string') {
        throw new Error("Erro: telefone_site");
      }
      if (!dados.endereco_site || typeof dados.endereco_site !== 'string') {
        throw new Error("Erro: endereco_site");
      }
    }
    
    static async inserirDadosDaEmpresaSiteBd(dados) {
      var dadaWebSite = new ModelWebSite(dados.nome_site, dados.sobre_site, dados.email_site, dados.telefone_site, dados.endereco_site);

      const idSite = await createwebSite(dadaWebSite);
      return idSite; // Certifique-se de que o resultado contém o ID que você precisa
  }

    static insertDadosRegistroSiteHtmlDominio(dados, idDoSite){
      const dominio = Service.retornaHtmlDominio(dados.nome_site, dados.endereco_site);
      //console.log(dominio)
      const html = Service.retornaHtml(dados)

      const dadosRegistroSiteHTMLDominio = new ModelRegistroHtmlDominio(html, dominio, 1, idDoSite)
      
      insertHtmlDominio(dadosRegistroSiteHTMLDominio);
      return html;
    }
  
    //Função que tem os processos de validação com inserção no banco
    static async processarDados(dados) {
      //console.log(dados)
      // Parte da verificação + inserção no banco
      Service.validarDados(dados);
  
      // Parte onde faz o primeiro insert dos dados da empresa tipo: nome, telefone etc...
      const idDoSite = await Service.inserirDadosDaEmpresaSiteBd(dados);//dandos erro

      // Inserindo o HTML e o dominio e retorna o html
      const html = Service.insertDadosRegistroSiteHtmlDominio(dados, idDoSite);
      return html;
  }

  static retornaHtmlDominio(nome, endereco) {
    const retorno = nome+endereco;
    return retorno;
  }

    static retornaHtml(dados) {
      try {
        return `
          <!DOCTYPE html>
          <html lang="pt-br">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Informações do Estabelecimento</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                .container {
                  background-color: #fff;
                  padding: 30px;
                  border-radius: 10px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  width: 80%;
                  max-width: 800px;
                }
                h1 {
                  text-align: center;
                  color: #2c3e50;
                  font-size: 32px;
                  margin-bottom: 20px;
                }
                .info {
                  margin: 20px 0;
                  padding: 15px;
                  background-color: #ecf0f1;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                }
                .info p {
                  margin: 10px 0;
                  font-size: 18px;
                  line-height: 1.6;
                }
                .info label {
                  font-weight: bold;
                  color: #34495e;
                }
                .info .value {
                  color: #7f8c8d;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  font-size: 14px;
                  color: #95a5a6;
                }
                .footer a {
                  color: #3498db;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Informações do Estabelecimento</h1>
                <div class="info">
                  <p><label>Nome do Estabelecimento: </label><span class="value">${dados.nome_site}</span></p>
                  <p><label>Sobre o Estabelecimento: </label><span class="value">${dados.sobre_site}</span></p>
                  <p><label>Email de Contato: </label><span class="value">${dados.email_site}</span></p>
                  <p><label>Telefone: </label><span class="value">${dados.telefone_site}</span></p>
                  <p><label>Endereço: </label><span class="value">${dados.endereco_site}</span></p>
                </div>
                <div class="footer">
                  <p>© 2025 ${dados.nome_site} | Todos os direitos reservados</p>
                  <p><a href="mailto:${dados.email_site}">Entre em contato conosco</a></p>
                </div>
              </div>
            </body>
          </html>
        `;
      } catch (error) {
        throw new Error("Error: " + error);
      }
    }  
  }

module.exports = {
    Service
}



