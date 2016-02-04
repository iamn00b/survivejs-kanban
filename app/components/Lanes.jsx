import React from 'react';

export default class Lanes extends React.Component {
  render() {
    return (
      <ul>
        {this.props.lanes.map(lane => 
          <li>{lane.name}</li>
        )}
      </ul>
    );
  }
}