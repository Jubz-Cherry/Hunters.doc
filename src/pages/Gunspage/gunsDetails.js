import styles from './Gunspage.module.css';
import Header from '../../components/Header';
import DropDown from '../../components/Dropdown';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/API';
import Banner from '../../components/Banner';


function GunsDetails(){
  const { name } = useParams();
  const [guns, setGuns] = useState(null);

  useEffect(() => {
    API.get('http://localhost:3001/guns')
      .then(res => {
        const found = res.data.find(m => m.name.toLowerCase() === name.toLowerCase());
        console.log('Arma encontrada:', found);
        setGuns(found);
      })
      .catch(err => console.error('Erro:', err));
  }, [name]);

  if (!guns) return <p>Carregando arma...</p>;


    return(
        <>
        <Header title={guns.name}/>
        <DropDown/>
        <Banner bannerUrl={guns.banner}/>
        <div className={'form-container'}>
        <div className={styles['login-container']}>

            <p><strong>Origem: </strong>{guns.origin}</p>

            <p><strong>Descrição: </strong>{guns.description}</p>
            
            <p><strong>Uso: </strong>{guns.usage}</p>
            
            <p><strong>Aparência: </strong>{guns.custom}</p>
            
            <p><strong>Fraquezas: </strong>{guns.weaknesses}</p>
            
            </div>
        </div>
        </>
    )
}

export default GunsDetails;