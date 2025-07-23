import style from './Cabecalho.module.css';
import logo from './hunterlogo.png'


function Cabecalho(){
    return(
        <header className={style['search-container']}>
            <img src={logo} alt="Logo do site"/>
          
            <input type='search' placeholder='Pesquisar'/>
            <button>Encontrar</button>
      
    </header>
    )
}

export default Cabecalho;