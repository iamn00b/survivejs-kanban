import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [];
  }

  create(lane) {
    lane.id = uuid.v4();
    lane.notes = lane.notes || [];

    const lanes = this.lanes.concat(lane);

    this.setState({ lanes }); 
  }

  attachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        if (lane.notes.indexOf(noteId) === -1) {
          lane.notes.push(noteId);
        } else {
          console.warn('Already attached note to Lane', lanes);
        }
      }

      return lane;
    });

    this.setState({lanes});
  }

  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        lane.notes = lane.notes.filter(note => note.id !== noteId);
      }

      return lane;
    });

    this.setState({lanes});
  }
}

export default alt.createStore(LaneStore, 'LaneStore');