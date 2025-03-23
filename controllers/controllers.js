const { Service } = require("../services/services");
const { ServiceConsultasSelect } = require("../services/serviceConsultasSelect");
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Tipos de rotas que vou desenvolver:
 * 1. CreateSite: rota onde vai receber os dados do site e retornar um html no service onde vai inserir na outra tabela
 * 2. consultarSite: rota de consultar site a partir de um user
 */

app.post("/CreateSite", async (req, res) => {
    //console.log("Requisição recebida:", req.body);  // Verifique se os dados estão corretos
    const dados = req.body;
  
    if (!dados || Object.keys(dados).length === 0) {
      return res.status(400).send({ error: "Dados vazios ou mal formatados" });
    }
  
    try {
      const html = await Service.processarDados(dados);
      res.status(200).send(html);
    } catch (error) {
      console.error("Error: verificação de dados - ", error);
      res.status(400).send({ error: "Erro ao processar os dados" });
    }
});
  
//consulta todas tabelas
app.get("/todos-informacoes-website", async (req, res) => {
  try {
    const dado = await ServiceConsultasSelect.consultarGET_todosInfo_website();
    res.status(200).send(dado);
  } catch (error) {
    console.error("Error");
    res.status(400).send({ error: "" });
  }
})

app.get("/todos-informacoes-tecnicas-website", async (req, res) => {
  try {
    const dado = await ServiceConsultasSelect.consultarGET_todosTechnical_info();
    res.status(200).send(dado);
  } catch (error) {
    console.error("Error");
    res.status(400).send({ error: "" });
  }
})

//Consultas por id
app.get("/id-informacoes-website/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dado = await ServiceConsultasSelect.consultarGET_idInfo_website(id);
    res.status(200).send(dado);
  } catch (error) {
    console.error("Error");
    res.status(400).send({ error: "" });
  }
})
app.get("/id-informacoes-tecnicas-website/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dado = await ServiceConsultasSelect.consultarGET_idTechnical_info(id);
    res.status(200).send(dado);
  } catch (error) {
    console.error("Error");
    res.status(400).send({ error: "" });
  }
})

//Consultas join 
app.get("/join-todos-dados", async (req, res) => {
    try {
      const dado = await ServiceConsultasSelect.consultarGET_joinTodosOsDados();
      res.status(200).send(dado);
    } catch (error) {
      console.error("Error:", error); // Exibe o erro no console
      res.status(400).send({ error: "" }); // Resposta adequada em caso de erro
    }
});
app.get("/join-dados-por-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dado = await ServiceConsultasSelect.consultarGET_joinDadosPorId(id);
    res.status(200).send(dado);
  } catch (error) {
    console.error("Error:", error); // Exibe o erro no console
    res.status(400).send({ error: "" }); // Resposta adequada em caso de erro
  }
});

//rota para retornar ultimo site criado
app.get("/ultimo-site-gerado", async (req, res) => {
  try {
    const resultado = await ServiceConsultasSelect.consultarGET_ultimoWebSiteCriado();
    
    // Verifica se o resultado é um array e tem pelo menos um item
    //if (!Array.isArray(resultado) || resultado.length === 0) {
    //  return res.status(404).send({ error: "Nenhum HTML encontrado" });
    //}

    // Pega o HTML da primeira posição do array
    const html = resultado[0].html_gerado || '';

    // Remove as quebras de linha e espaços extras
    const htmlLimpo = html.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
    res.status(200).send(htmlLimpo);
  } catch (error) {
    console.error("Erro ao obter o site gerado:", error);
    res.status(500).send({ error: "Erro ao recuperar o site." });
  }
});

app.listen(9090, () => {
    console.log('Servidor rodando em http://localhost:9090');
});
