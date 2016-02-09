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

    this.deleteNote = this.deleteNote.bind(this, laneId);
  }
  render() {
    const {lane, ...props} = this.props;

    return (
      <div className="lane" {...props}>
        <div className="laneHeader" onClick={this.activateLaneEdit}>
          <button className="laneAddNote" onClick={this.addNote}>+</button>
          <Editable 
            className="laneName"
            editing={lane.editing}
            value={lane.name}
            onEdit={this.editName} 
            onDelete={this.deleteLane} />
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

  addNote = (e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;
    const note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      laneId: laneId,
      noteId: note.id
    });
  };
  editNote(id, task) {
    NoteActions.update({
      id,
      task, 
      editing: false
    });
  }
  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId);
  }
  activateNoteEdit(id) {
    NoteActions.update({
      id: id,
      editing: true
    });
  }

  editName = (name) => {
    const laneId = this.props.lane.id;

    LaneActions.update({
      id: laneId,
      name: name,
      editing: false
    });
  };
  deleteLane = () => {
    const laneId = this.props.lane.id;

    LaneActions.delete(laneId);
  };
  activateLaneEdit = () => {
    const laneId = this.props.lane.id;

    LaneActions.update({
      id: laneId,
      editing: true
    });
  };
}