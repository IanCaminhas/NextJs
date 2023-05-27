import { GetStaticProps } from "next";

/*As páginas do ssg(GetStaticProps) são criadas no build da aplicação.
Quando faço o build de produção, o next nesse processo já cria as páginas estáticas: HTML, CSS... tudo que é necessário para renderizar a página

O resultado: um HTML construído no build da aplicação. Ganho em performance, pois o conteúdo já está na página HTML.
Não há requisição para API, acesso ao banco de dados... Tudo foi feito no processo build

*/
interface Post {
  id:string;
  title: string;
}

interface PostsProps {
  posts: Post[];
}


export default function Posts({posts}: PostsProps) {
    return (
      <div>
        <h1>Listagem de Posts</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  //Se eu tirar o async, o typeScript reclama pois preciso ter uma promise no retorno
  export const getStaticProps: GetStaticProps<PostsProps> = async () => {
    const response =  await fetch('http://localhost:3333/posts');
    const posts = await response.json();

    return {
      props: {
        posts,
      },
      revalidate: 5, // In seconds - O servidor node vai ficar recriando a página a cada 5 segundos. /posts (ISR: 5 Seconds)
    };
  }