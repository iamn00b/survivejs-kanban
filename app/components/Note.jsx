import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }
  render() {
    if (this.state.editing)
      return this.renderEditNote();

    return this.renderDisplayNote();
  }

  renderEditNote = () => {
    return (
      <input 
        type="text"
        ref={
          (e) => e ? e.selectionStart = this.props.task.length : null
        }
        autoFocus={true}
        defaultValue={this.props.task}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter} />
    );
  };

  renderDisplayNote = () => {
    return (
      <div onClick={this.editTask}>{this.props.task}</div>
    );
  };

  editTask = () => {
    this.setState({
      editing: true
    });
  };

  checkEnter = (e) => {
    if (e.key === 'Enter')
      this.finishEdit(e);
  };

  finishEdit = (e) => {
    const task = e.target.value;

    if (this.props.onEdit && task.trim()) {
      this.props.onEdit(task);

      this.setState({
        editing: false
      });
    }
  };
}