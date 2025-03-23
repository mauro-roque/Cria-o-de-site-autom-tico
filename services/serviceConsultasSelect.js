const {ConsultaOSite} = require("../repositories/repositoriesConsultasSelect.js");

const consultasSite = new ConsultaOSite();

class ServiceConsultasSelect {
    static async consultarGET_todosInfo_website(){
        const dado = await consultasSite.selectFromTodosInfo_website();
        return dado;
    }
    static async consultarGET_todosTechnical_info(){
        const dado = await consultasSite.selectFromTodosTechnical_info();
        return dado;
    }

    static async consultarGET_idInfo_website(id){
        const dado = await consultasSite.selectPorIdInfo_website(id);
        return dado;
    }
    static async consultarGET_idTechnical_info(id){  
        const dado = await consultasSite.selectPorIdTechnical_info(id);
        return dado;
    }

    static async consultarGET_joinTodosOsDados(id){
        const dado = await consultasSite.selectInnerJoinTodosDados(id);
        return dado;
    }
    static async consultarGET_joinDadosPorId(id){  
        const dado = await consultasSite.selectInnerJoinPorId(id);
        return dado;
    }

    //traz o ultimo html gerado consulta criada para teste
    static async consultarGET_ultimoWebSiteCriado(id){  
        const dado = await consultasSite.ultimoWebSiteCriado();
        return dado;
    }
}

module.exports = {
    ServiceConsultasSelect
}