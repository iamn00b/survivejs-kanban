import React from 'react';
import Notes from './Notes';
import AltContainer from 'alt-container';
import Editable from './Editable';

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
        <div className="laneHeader" onClick={this.activateLaneEdit}>
          <div className="laneAddNote">
            <button onClick={this.addNote}>+</button>
          </div>
          <Editable 
            className="laneName"
            editing={lane.editing}
            value={lane.name}
            onEdit={this.editName} />
          <button className="deleteBtn" onClick={this.deleteLane}>x</button>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }} >
          <Notes
            onValueClick={this.activateNoteEdit} 
            onEdit={this.editNote} 
            onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }

  addNote(e) {
    e.stopPropagation();

    const note = NoteActions.create({task: 'New task'});
    const laneId = this.props.lane.id;

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

  editName = (name) => {
    const laneId = this.props.lane.id;

    console.log(`edit lane ${laneId} name using ${name}`);
  };
  deleteLane = () => {
    const laneId = this.props.lane.id;

    console.log(`delete lane ${laneId}`);
  };
  activateLaneEdit = () => {
    const laneId = this.props.lane.id;

    console.log(`activate lane ${laneId} edit`);
  };
  activateNoteEdit(id) {
    console.log(`activate note ${id} edit`);
  }
}