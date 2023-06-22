import { GetStaticProps } from "next";
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import SEO from '../../components/SEO';
import Link from "next/link";
import styles from './posts.module.scss';
import { getPrismicClient } from "../api/services/prismic";

interface Post {
    slug: string;
    title: string;
    excerpt: any;
    updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
    return (
      <>
        <SEO title="Posts"/>

        <main className={styles.container}>
          <div className={styles.posts}>
            {posts.map(post =>(
              <Link href={`/posts/${post.slug}`} key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
            </Link>
            ))}
          </div>
        </main>
      </>
    );
  }

  //Isso é o node que o nextjs disponibiliza
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
    Olha no console do terminal é só uma rápida verificação
    console.log(response);
    Já vem de forma paginada ainda
    */

    //Estou fazendo a renderização antes da formatação
    //Vou retornar um objeto com tudo formatado
    const posts = response.results.map(post => {
      return {
        slug: post.uid,
        title: RichText.asText(post.data.title), //erro normal
        excerpt: //é uma espécie de resumo
          post.data.content.find(content => content.type === 'paragraph')?.text ?? //erro normal
          '',
          //isso aqui é do próprio nextjs...JavaScript na verdade
        updatedAt: new Date(post.last_publication_date).toLocaleDateString(
          'pt-BR',
          {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          },
        ),
      };
    });

    return {
      props: {
        posts,
      },
      // In seconds - O servidor node vai ficar recriando a página a cada 5 segundos. /posts (ISR: 5 Seconds)
      //Aqui foi em 12 horas: 60 segundos * 60 minutos * 12 horas
      revalidate: 60*60*12, 
    };
  }