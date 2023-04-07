import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink';

export function Header(){

    /*
        Retorno a rota que o usuário se encontra no momento
        Também posso fazer isso:  
        const router = useRouter();
        router.asPath

    */
    //Não preciso usar aqui o const {asPath} = useRouter()... Pois vou usar no ActiveLink Component
    //const {asPath} = useRouter();
   
    /*
        Quando a rota for igual a rota do link(ou seja, rota atual), fica ativado
        <Link href="/" className={asPath === '/' ? styles.active : ''}>Home</Link> 
        <Link href="/posts" className={asPath === '/posts' ? styles.active : ''}>Posts</Link>

        Posso fazer assim também: manter a estilização diferente para o link referente à página que o usuário está acessando no momento:
        <Link href="/" className={asPath === '/' ? styles.active : ''}>Home</Link> 
        <Link href="/posts" className={asPath === '/posts' ? styles.active : ''}>Posts</Link>
        Vou usar um componente para isso: ActiveLink Component
    */

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <img src="/logo.svg" alt="DevNews!" />
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active} titleLink="Home" /> 
                    <ActiveLink href="/posts" activeClassName={styles.active} titleLink="Posts" />
                </nav>
            </div>
        </header>
    );
}