class ModelWebSite {
    constructor(nome_site, sobre_site, email_site, telefone_site, endereco_site) {
        this.nome_site = nome_site;
        this.sobre_site = sobre_site;
        this.email_site = email_site;
        this.telefone_site = telefone_site;
        this.endereco_site = endereco_site;
    }

    // GETTERS AND SETTERS
    getNome_site() {
        return this.nome_site;
    }
    setNome_site(nome_site) {
        this.nome_site = nome_site;
    }

    getSobre_site() {
        return this.sobre_site;
    }
    setSobre_site(sobre_site) {
        this.sobre_site = sobre_site;
    }

    getEmail_site() {
        return this.email_site;
    }
    setEmail_site(email_site) {
        this.email_site = email_site;
    }

    getTelefone_site() {
        return this.telefone_site;
    }
    setTelefone_site(telefone_site) {
        this.telefone_site = telefone_site;
    }

    getEndereco_site() {
        return this.endereco_site;
    }
    setEndereco_site(endereco_site) {
        this.endereco_site = endereco_site;
    }
}

//futuramente posso criar varios templates como modelo;
module.exports = ModelWebSite;