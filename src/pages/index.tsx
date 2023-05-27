import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

interface Post {
  id:string;
  title: string;
}

interface HomeProps {
  posts: Post[];
}

//{ posts }: HomeProps é o retorno do método getServerSideProps... Isso é a desestruturação
//Agora quem monta esse método é o server side e não o client side(o que está comentado)... O componente não monta mais nada, apenas renderiza.
export default function Home({ posts }: HomeProps) {

  //const [posts,setPosts] = useState<Post[]>([]);

  //Isso aqui é o que fazemos no react. Também é feito no nextjs... isso aqui é o Client Side Rendering... Está sendo renderizado pelo lado do cliente... 
  /*depois que o componente Home() é renderizado, sai o pedido para buscar os dados fetch('http://localhost:3333/posts').then((response) =>{.. 
  Aí os dados vão ser exibidos na lista {posts.map((post) => (<li key={post.id}>{post.title}</li> */
  //useEffect é um hook assim que o componente é montado
  //useEffect(() => {
    /*fetch já vem nativo, axios tem que ser instalado.
      armazena tudo que o fetch trouxe num estado: setPosts(data);
      setPosts é quem altera o estado posts..
      Isso é o Client Side Rendering,ou seja, a renderização no lado do cliente
    */
    //fetch('http://localhost:3333/posts').then((response) =>{
    //  response.json().then((data)=>{
    //    setPosts(data);
   //   });
//    });
//  },[]);

  return (
    <div>
      <h1>Posts</h1>
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
    </div>
  )
}

//Esse método é chamado antes do componente ser renderizado. O componente é o Home()
//Quando o next identifica o método getServerSideProps na página, os comandos nele são executados primeiro
//Por que ? quem executa essa cara é o node que poussímos no next
//node vai requisitar para a api os dados através do fetch('http://localhost:3333/posts')
//Com os dados recebidos(const post), o node envia para o componente.
//No método getServerSideProps, o objeto props{posts} com os posts que é enviado
//e os posts é do tipo HomeProps
export const getServerSideProps: GetServerSideProps<HomeProps> = async() => {
  const response =  await fetch('http://localhost:3333/posts');
  //Aqui tenhos os posts aqui
  //Precisamos definir o tipo de retorno desse método. Se eu fizer const posts, o retorno é any
  //Solução: a interface que o nextjs já define -> GetServerSideProps(interface que representa o retorno do método)
  //transformo numa arrow function
  //GetServerSideProps recebe um generics que representa os dados que vão retornar
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}