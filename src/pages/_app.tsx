import { Header } from '../components/Header';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  //Esse componente header é o cabeçalho que aparece em todas as páginas
  return(
    <>
    <Header />
        <Component {...pageProps} />
    </>
);

}

export default MyApp
