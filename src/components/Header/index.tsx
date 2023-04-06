import { useRouter } from 'next/router';
import styles from './styles.module.scss'
import Link from 'next/link';

export function Header(){

    /*
        Retorno a rota que o usuário se encontra no momento
        Também posso fazer isso:  
        const router = useRouter();
        router.asPath
    */
    //
    const {asPath} = useRouter();
   
    /*
        Quando a rota for igual a rota do link(ou seja, rota atual), fica ativado
        <Link href="/" className={asPath === '/' ? styles.active : ''}>Home</Link> 
        <Link href="/posts" className={asPath === '/posts' ? styles.active : ''}>Posts</Link>
    */

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <img src="/logo.svg" alt="DevNews!" />
                <nav>
                    <Link href="/" className={asPath === '/' ? styles.active : ''}>Home</Link> 
                    <Link href="/posts" className={asPath === '/posts' ? styles.active : ''}>Posts</Link>
                </nav>
            </div>
        </header>
    );
}