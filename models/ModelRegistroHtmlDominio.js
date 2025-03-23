class ModelRegistroHtmlDominio{
    constructor(html_gerado, local_gerado_url, site_on, fk_info_website) {
        this.html_gerado = html_gerado;
        this.local_gerado_url = local_gerado_url;
        this.site_on = site_on;
        this.fk_info_website = fk_info_website;
    }
}

module.exports = ModelRegistroHtmlDominio;