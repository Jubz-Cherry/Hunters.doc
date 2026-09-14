import styles from './Menu.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Menu(){
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

    return(
        <>
            <div className={styles.menuWrapper}>
      <button onClick={toggleMenu} className={styles.menuButton}>
        &#9776;
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <p>
          <Link to="/Home">Home</Link>
          </p>
          <p>
          <Link to="/guns">Armas</Link>
          </p>
          <p>
          <Link to="/profile">Meu perfil</Link>
          </p>
          <p>
          <Link to="/" onClick={handleLogout}>Sair</Link>
          </p>
        </div>
      )}
    </div>
        </>
    )
}

export default Menu;