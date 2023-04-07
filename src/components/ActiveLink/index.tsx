import Link, {LinkProps} from 'next/link';
import { useRouter } from 'next/router';

/*Herda tudo que o Link possui(LinkProps), por isso o uso do extends LinkProps... 
Fazendo isso, fica igual ao Link. A diferença agora é que adicionamos as propriedades children, activeClassName e titleLink */
interface ActiveLinkProps extends LinkProps {
    //children: ReactElement; //filho do Link, no caso do curso foi o <a></a>... Mas <a></a> não é mais usado com o <Link></Link>
    activeClassName: string; //para indicar se o link está ativo, ou seja, a classe CSS que vai indicar que o link está ativo
    titleLink: string; //nome para o link
}
//props: ActiveLinkProps posso fazer assim também. Mas já faço a desestruturação 
//Imagine ter que colocar todos os herdeiros de LinkProps na desestruturação ? faço o spreed ...otherProps que signfica todas as outras propriedades
export function ActiveLink({activeClassName,titleLink, ...otherProps}: ActiveLinkProps){
     
    const { asPath } = useRouter();
    /*  
        Quando a rota for igual a rota do link(ou seja, rota atual), fica ativado.
        A rota atual é representada por asPath e a rota que o usuário clicou é em otherProps.href
    */
    const className = asPath === otherProps.href ? activeClassName : '';
    return <Link {...otherProps} className={className}>{titleLink}</Link>
    
}

/*
1 - Faço um clone do elemento children
2 - Também acrescento ao clone uma variavel/propriedade className

return(
    <Link {...otherProps}>
        {cloneElement(children, {
            className,
        })}
    </Link>
    );

*/