import React from 'react';
import Note from './Note.jsx';

export default class Notes extends React.Component {
  render() {
    const notes = this.props.notes;
    const onEdit = this.props.onEdit;
    
    return (
      <ul>{notes.map(note =>
        <li key={note.id}>
          <Note 
            task={note.task}
            onEdit={onEdit.bind(null, note.id)} />
        </li>
      )}</ul>
    );
  }
}