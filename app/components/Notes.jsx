import React from 'react';
import Editable from './Editable.jsx';

export default class Notes extends React.Component {
  render() {
    const {notes, onValueClick, onEdit, onDelete} = this.props;
    
    return (
      <ul className="notes">{notes.map(note =>
        <li key={note.id}>
          <Editable
            className="note"
            editing={note.editing} 
            value={note.value}
            onValueClick={onValueClick.bind(null, note.id)}
            onEdit={onEdit.bind(null, note.id)}
            onDelete={onDelete.bind(null, note.id)} />
        </li>
      )}</ul>
    );
  }
}