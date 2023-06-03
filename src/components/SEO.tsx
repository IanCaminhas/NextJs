import Head from 'next/head';

//São as propriedades do componente SEO
interface SEOProps {
    title: string;
    description?: string;  //descrição que pode ser usada pelos crawlers. essa descricao vai ser opcional
    image?: string; //imagem de uma página, que tabém pode ser opcional
    excludeTitleSuffix?: boolean; //como nome padrão é Dev News! é para ficar assim por exemplo: Dev News! | Posts... O sufixo não aparecer Se for true ao passar para o componente
    indexPage?: boolean; //É para indexar a página ? existem páginas que não quero indexar
}

//esse componente vai estar sendo importado em cada página
//Essa estrutura está contendo tags
//<title>Dev News!</title> conseguimos customizar esse componente, ou seja, o título... Caso queira
//Atribuí esse componente na página index
export default function SEO({
    title,
    description,
    image,
    excludeTitleSuffix = false,
    indexPage = true, //eu quero que a página seja indexada por padrão
}: SEOProps) {
    // tem valor em !excludeTitleSuffix ? Aí posso compor o título:  Dev News!... Se eu nãqo quiser excluir o sufixo do título: incluo '' depois do title
    const pageTitle = `${title} ${!excludeTitleSuffix ? '| Dev News!' : ''}`;
    //Tem valor na image ? pega a url e completa
    const pageImage = image ? `${process.env.NEXT_PUBLIC_SITE_UTL}/${image}`: null;

    /*
         Tem valor no description ? exibe a tag <meta/>. Se não, não exibe
        {description && <meta name="description" content={description} />}

         Tem valor no pageImage ? exibe a tag <meta/>. Se não, não exibe
        {pageImage && <meta name="image" content={pageImage} />}

        Como não quero indexar a página:
        {!indexPage && <meta name="image" content={pageImage} />}

    */

    return (
        <Head>
            <title>{pageTitle}</title>
            {description && <meta name="description" content={description} />}
            {pageImage && <meta name="image" content={pageImage} />}
            {!indexPage && <meta name="image" content="noindex, nofollow" />}

            <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
            <meta name="MobileOptimized" content="320" />
            <meta name="HandheldFriendly" content="True" />
            <meta name="theme-color" content="#302F38" />
            <meta name="msapplication-TileColor" content="#302F38" />
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta name="google" content="notranslate" />

            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={pageTitle} />
            <meta property="og:image" content={pageImage} />
            <meta property="og:image:secure_url" content={pageImage} />
            <meta property="og:image:alt" content="Thumbnail" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@ContactstSmart" />
            <meta name="twitter:creator" content="@ContactstSmart" />
            <meta name="twitter:image" content={pageImage} />
            <meta name="twitter:image:src" content={pageImage} />
            <meta name="twitter:image:alt" content="Thumbnail" />
            <meta name="twitter:image:width" content="1200" />
            <meta name="twitter:image:height" content="620" />
        </Head>
    );
}