//Arquivo de configuração para se conectar na API.
import Prismic from '@prismicio/client';

//não sabemos o tipo de req?... Por isso o unknown
export function getPrismicClient(req?: unknown) {
    //Configuração para acessar a API do prismic. A configuração está armazenada na variável prismic
    //O primeiro parâmentro é o url. 
    const prismic = Prismic.client(process.env.PRISMIC_ENDPOINT, {
        req, //essa é a requisição a ser na API do PRISMIC
        accessToken: process.env.PRISMIC_ACCESS_TOKEN
    });

    return prismic;
}