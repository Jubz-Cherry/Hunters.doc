import styles from './Dropdown.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Dropdown(){
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

    return(
        <>
            <div className={styles.menuWrapper}>
      <button onClick={toggleMenu} className={styles.menuButton}>
        &#9776;
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <p>
          <Link to="/guns">Armas</Link>
          </p>
          <p>
          <Link to="/notes">Anotações</Link>
          </p>
          <p>
          <Link to="/Home">Home</Link>
          </p>
          <p>
          <Link to="/">Sair</Link>
          </p>
        </div>
      )}
    </div>
        </>
    )
}

export default Dropdown;