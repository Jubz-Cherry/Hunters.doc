import styles from './Header.module.css';

function Header({ title }){
    return(
        <div className={styles.header}>
        <h1>{title}</h1>
      
        </div>
    )
}

export default Header;