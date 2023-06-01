import { useState } from 'react';
import dynamic from 'next/dynamic'; //esse recurso permite fazer o carregamento por demanda
//import { Modal } from '../components/Modal';

const Modal = dynamic(
    //Quando o componente mod for retornado, chama o method Modal no arquivo ../components/Modal
    () => import('../components/Modal').then(mod => mod.Modal),
    {
      //spinner, ou seja, enquanto o componente é carregado isso fica para o usuário.
      loading: () => <p>Loading...</p>,
      ssr: false,
    },
  );

export default function calculo() {
    const [modalVisible, setModalVisible] = useState(false);;

    async function handleSum() {
        //Antes era sim: import calc from '../libs/calc'... Não vou ter esse carregamento automático
        //Importação sob demanda:
        const calc = (await import('../libs/calc')).default;
        alert(calc.sum(5,6));
    }

    function handleModalVisible(){
        //Quando o Modal tiver true, vai ser exibido isso aqui: {modalVisible && <Modal />}... Se tiver false, esse modal não será exibido
        setModalVisible(true);
    }

    return (
        <div>
            <h1>Calculo</h1>
           <button 
                onClick={() =>{
                    //handleSum;
                    handleModalVisible;
                }}>
                Somar
            </button>
            {modalVisible && <Modal />}
        </div>
    )
}
