import React from 'react';
import Note from './Note.jsx';
import Editable from './Editable.jsx';
import LaneActions from '../actions/LaneActions';

export default class Notes extends React.Component {
  render() {
    const {notes, onValueClick, onEdit, onDelete} = this.props;
    
    return (
      <ul className="notes">{notes.map(note =>
        <Note 
          className="note" 
          key={note.id}
          id={note.id}
          editing={note.editing}
          onMove={LaneActions.move}>
            <Editable
              editing={note.editing} 
              value={note.task}
              onValueClick={onValueClick.bind(null, note.id)}
              onEdit={onEdit.bind(null, note.id)}
              onDelete={onDelete.bind(null, note.id)} />
        </Note>
      )}</ul>
    );
  }
}