import style from './ListItem.module.css'
import { useNavigate } from 'react-router-dom';

function ListItem({ title, link }){
    const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };
    return(
        <div onClick={handleClick} className={style.ListItem}>
      {title}
      </div>
    )
}

export default ListItem;