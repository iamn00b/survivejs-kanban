import React from 'react';

export default class Note extends React.Component {
  render() {
    const task = this.props.task;

    return (
      <div>{task}</div>
    );
  }
}