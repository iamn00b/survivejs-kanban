import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.notes = [];
  }

  create(note) { 
    note.id = uuid.v4();

    const notes = this.notes.concat(note);

    this.setState({ notes });

    return note;
  }

  update(updatedNote) { 
    const notes = this.notes.map(note => {
      if (note.id === updatedNote.id) {
        return Object.assign({}, note, updatedNote);
      }

      return note;
    });

    this.setState({ notes });

  }

  delete(id) { 
    const notes = this.notes.filter(note => note.id !== id);

    this.setState({ notes });
  }

}

export default alt.createStore(NoteStore, 'NoteStore');