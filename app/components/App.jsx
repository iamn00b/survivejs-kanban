import React from 'react';
import AltContainer from 'alt-container';
import Notes from './Notes';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {

  render() { 
    return (
      <div>
        <button onClick={this.addNote}>+</button>

        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }} >

            <Notes 
              onEdit={this.editNote}
              onDelete={this.deleteNote} />

        </AltContainer>

      </div>
    );
  }

  addNote() {
    NoteActions.create({task: 'New Task'});
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }
}