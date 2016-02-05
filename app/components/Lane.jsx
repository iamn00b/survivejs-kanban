import React from 'react';
import Notes from './Notes';
import AltContainer from 'alt-container';

import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import NoteStore from '../stores/NoteStore';

export default class Lane extends React.Component {
  constructor(props) {
    super(props);

    const laneId = props.lane.id;

    this.addNote = this.addNote.bind(this, laneId);
    this.deleteNote = this.deleteNote.bind(this, laneId);
  }
  render() {
    const {lane, ...props} = this.props;

    return (
      <div className="lane" {...props}>
        <div className="laneHeader">
          <div className="laneAddNote">
            <button onClick={this.addNote}>+</button>
          </div>
          <div className="laneName">{lane.name}</div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }}
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }

  addNote(laneId) {
    const note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      laneId: laneId,
      noteId: note.id
    });
  }
  editNote(id, task) {
    NoteActions.update({id, task});
  }
  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId);
  }
}