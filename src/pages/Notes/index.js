import { useState, useEffect } from 'react';
import styles from './Notes.module.css';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import backgroundImg from '../../img/sw.dw.jpg';


function Notes(){
const [notes, setNotes] = useState([]);
const [title, setTitle] = useState('');
const [content, setContent] = useState('');

useEffect(() => {
  const fetchNotes = async () => {
    try {
      const res = await fetch('http://localhost:3001/notes');
      if (!res.ok) {
        console.error('Erro ao carregar notas');
        return;
      }
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  fetchNotes();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
  });

  const newNote = await res.json();
  setNotes([newNote, ...notes]);
  setTitle('');
  setContent('');
};

const handleDelete = async (id) => {
  await fetch(`http://localhost:3001/note/${id}`, {
      method: 'DELETE',
  });

  setNotes(notes.filter(note => note._id !== id));
};

    return(
        <>
        <Menu/>
        <Header title="Minhas anotações"/>
        <div className={styles.background} style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className={styles.notesContainer}>
    <form onSubmit={handleSubmit} className={styles.noteForm}>
        <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className={styles.noteTitle}
        />
        <textarea
        placeholder="Escrever nota..."
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        className={styles.noteContent}
        />
        <button type="submit" className={styles.saveButton}>
        Salvar
        </button>
    </form>

    <div className={styles.cardsWrapper}>
        {notes.map(note => (
        <div key={note.id} className={styles.noteCard}>
            <div className={styles.cardInfo}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
            </div>
            <button
            className={styles.deleteButton}
            onClick={() => handleDelete(note._id)}
            >
            Excluir
            </button>
        </div>
        ))}
        </div>
    </div>
</div>

        </>
    )
}

export default Notes; 