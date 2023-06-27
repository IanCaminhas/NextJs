import { GetStaticPaths, GetStaticProps } from 'next';
import {useRouter} from 'next/router';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getPrismicClient } from '../api/services/prismic';
import SEO from '../../components/SEO';
import styles from './post.module.scss';

interface PostProps {
 post: {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
 };
}

export default function Post({ post }: PostProps) {
    const router = useRouter();

    if(router.isFallback){
      return <p>Loading...</p>;
    }

    return (
      <>
        <SEO title="Post"/>

        <main className={styles.container}>
          <article className={styles.post}>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: post.content}} />
          </article>
        </main>
      </>
    );
  }

/*
interface Comment {
  id: string;
  body: string;
}

interface CommentsProps {
  comments: Comment[];

}

export default function Post({ comments }: CommentsProps) {
  //Aqui estou gerando uma página estática de cada post
    const router = useRouter();

    if(router.isFallback){
      return <p>Loading...</p>
    }

    return (
    <>
      <h1>Post {router.query.id}</h1>
      <ul>
        {comments.map(comment =>(
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </>
    );
  }
*/
//Quando uso esse método ? quando preciso criar página estática que recebe parâmetro.
//através desse método, o next buscará todos os posts que podem ser usados como parâmetros e criar uma página para cada um desses posts
/*Esse método retorna o objeto que dois parâmetros: paths ->
que são os caminhos/possibilidades, ou seja, vai criar uma página para cada uma delas
fallback ->

Se eu fizer paths: [], já funciona. Não necessitando passar {params: {}}. O que acontece ?
Não vai criar nenhuma página na build. Entretanto, no primeiro acesso a cada página vai ser criadoo HTML.
A partir do segundo acesso, o usuário vai acessar a página criada no primeiro acesso.
Isso pode ser uma solução para os 50000 posts
Quando ocorrer o primeiro acesso, vai ter um delay(tem que criar a página). Mas quando acessar pela segunda vez, esse delay acaba.

Voltando ao assunto...
Pegar a lista de posts, informá-la no params. Aí vai ser gerada uma página HTML para cada POST.

*/

/*
  Olha só a saída quando dou um npm run build
  /posts/[id] (ISR: 5 Seconds) (1444 ms)  366 B          75.9 kB
    ├ /posts/3 (402 ms)
    ├ /posts/2 (363 ms)
    ├ /posts/4 (363 ms)
    └ /posts/1 (316 ms)

    cada post uma página
*/

export const getStaticPaths: GetStaticPaths = async() => {
  //const response =  await fetch('http://localhost:3333/posts');
  //const posts = await response.json();

  //para cada post, estou retornando um objeto de cada um deles... No final, um array é criado
  //const paths = posts.map(post => {
  //  return {
      //params: {id: String(post.id) },
    //}
 // });

  return {
    paths:[], //paths: paths -> short sintax. Poderia fazer assim também

    /*esse fallback é o seguinte: quando eu sei quais estáticos a serem gerados, devo usar false.
    Qual estático ? os posts. No caso aqui, eu sei que precisam ser geradas quatro páginas estáticas.
    Se eu tiver acessando algum post que não está na seguinte listagem: params: {id: String(post.id) },
    vai retornar umma página 404... Ou seja, não vai tentar gerar uma página estática automaticamente.

    Existem os seguintes posts: 1, 2, 3 e 4. Se eu fizer http://localhost:3000/posts/12, vai dar uma página 404.
    Quando uso esse caso ? quando tenho poucos registros e posso criar essas páginas estáticas no processo de build.

    Quando vou usar o fallback como true então ? fallback:true
    quando usar o paths com array vazio. O que isso siginica ? Se não tiver uma página estática criada, cria agora.

    Existem os seguintes posts: 1, 2, 3 e 4. Se eu fizer http://localhost:3000/posts/12, vai dar uma página estática vai ser criada.
    Não vai ser criada uma página 404.
    Quando usar essa forma: quando tenho muitos registros. Aí não vale a pena usar utilizar o processo de build. Imagina 50000
    páginas estáticas ?

    Isso é fantástico, pois ganho performance e nada fica engessado.

    */
    fallback: true,
  };
};

/*
export const getStaticProps: GetStaticProps<CommentsProps> = async context => {
  const { id } = context.params;
  const response =  await fetch(`http://localhost:3333/comments?postId=${id}`);
  const comments = await response.json();

    return {
      props: {
        comments,
      },
      revalidate: 5,
    };
  }
  */

  export const getStaticProps: GetStaticProps = async context => {
    const { slug } = context.params;
    const prismic = getPrismicClient();
    const response = await prismic.getByUID('post', String(slug), {});
    
      const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: format(
          new Date(response.last_publication_date),
          "d 'de' MMMM 'de' yyyy",
          { locale: ptBR },
        ),
      };

      return {
        props: {
          post,
        },
        revalidate: 60 * 60 * 12, // 12 horas
      };
    };
