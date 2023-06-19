import { GetStaticProps } from "next";
import Prismic from '@prismicio/client';
import SEO from '../../components/SEO';
import Link from "next/link";
import styles from './posts.module.scss';
import { getPrismicClient } from "../api/services/prismic";

interface Post {
  id:string;
  posts: Post[];
}

export default function Posts() {
    return (
      <>
        <SEO title="Posts"/>

        <main className={styles.container}>
          <div className={styles.posts}>
            <Link href="#" legacyBehavior>
              <a>
                <time>04 de junho de 2023</time>
                <strong>Título</strong>
                <p>Paragrafo</p>
              </a>
            </Link>
          </div>
        </main>
      </>
    );
  }
  export const getStaticProps: GetStaticProps = async () => {
    //Isso aqui é a conexão com a API. Através disso aqui, consigo fazer uma query e trazer os dados
    const prismic = getPrismicClient();
    //at recebe o que vou procurar
    const response = await prismic.query([
      Prismic.predicates.at('document.type', 'post')
    ], {
      fetch: ['post.title', 'post.content'],
    }
    );
    /*
    Olha no console do terminal
    console.log(response);
    Já vem de forma paginada ainda
    */

    return {
      props: {},
      // In seconds - O servidor node vai ficar recriando a página a cada 5 segundos. /posts (ISR: 5 Seconds)
      //Aqui foi em 12 horas: 60 segundos * 60 minutos * 12 horas
      revalidate: 60*60*12, 
    };
  }