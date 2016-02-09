import React from 'react';
import Notes from './Notes';
import AltContainer from 'alt-container';
import Editable from './Editable';

import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import NoteStore from '../stores/NoteStore';

import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const laneTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    const targetId = targetProps.lane.id;
    
    if (targetProps.lane.notes.length === 0){
      LaneActions.attachToLane({
        laneId: targetId,
        noteId: sourceId
      });
    }
  }
};

@DropTarget(ItemTypes.NOTE, laneTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Lane extends React.Component {
  constructor(props) {
    super(props);

    const laneId = props.lane.id;

    this.deleteNote = this.deleteNote.bind(this, laneId);
  }
  render() {
    const {lane, connectDropTarget, ...props} = this.props;

    return connectDropTarget(
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