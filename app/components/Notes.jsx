import React from 'react';
import Note from './Note.jsx';

export default class Notes extends React.Component {
  render() {
    const notes = this.props.notes;
    
    return (
      <ul>{notes.map(note =>
        <li key={note.id}>
          <Note task={note.task} />
        </li>
      )}</ul>
    );
  }
}