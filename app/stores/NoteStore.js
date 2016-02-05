import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.notes = [];

    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this)
    });
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

  getNotesByIds(ids) {
    const notes = (ids || [])
      // get notes as array of array of note
      .map(id => this.notes.filter(note => note.id === id))
      // filter non-matching ids
      .filter(n => n.length > 0)
      // get notes as array of note
      .map(n => n[0]);

    return notes;  
  }

}

export default alt.createStore(NoteStore, 'NoteStore');