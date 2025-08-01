import style from './Card.module.css'

function Card({id, titulo, capa}){
    return(
        <div className={style.Card}>
        <div className={style.container}>
            <img src={capa} alt={titulo} className={style.capa} />
        </div>
      </div>
     
    )
}

export default Card;
