import style from './Card.module.css'
import { useNavigate } from 'react-router-dom';

function Card({id, titulo, capa}){
  const navigate = useNavigate();

  const goToMonster = () => {
    
  const rota = '/' + titulo.toLowerCase();
  navigate(rota);
  
  }

    return(
        <div className={style.Card}>
        <div className={style.container}>
            <img src={capa} alt={titulo} className={style.capa} onClick={goToMonster}/>
        </div>
      </div>
     
    )
}

export default Card;
