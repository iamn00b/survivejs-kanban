import React from 'react';
import Note from './Note.jsx';

export default class Notes extends React.Component {
  render() {
    const {notes, onEdit, onDelete} = this.props;
    
    return (
      <ul className="notes">{notes.map(note =>
        <li key={note.id}>
          <Note 
            task={note.task}
            onEdit={onEdit.bind(null, note.id)}
            onDelete={onDelete.bind(null, note.id)} />
        </li>
      )}</ul>
    );
  }
}