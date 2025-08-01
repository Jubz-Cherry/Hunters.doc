import style from './Cabecalho.module.css';
import logo from './hunterlogo.png'


function Cabecalho({ onSearch, searchTerm }){
    return(
        <header className={style['search-container']}>
            <img src={logo} alt="Logo do site"/>
            
          
        <input type="search" placeholder="Pesquisar" value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}/>
            <button type="submit">Pesquisar</button>
      
    </header>
    )
}

export default Cabecalho;