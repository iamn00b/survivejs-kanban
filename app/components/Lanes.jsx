import React from 'react';
import Lane from './Lane';

export default class Lanes extends React.Component {
  render() {
    const {lanes, ...props} = this.props;

    return (
      <div className="lanes">
        {lanes.map(lane => 
          <Lane key={lane.id} lane={lane} />
        )}
      </div>
    );
  }
}