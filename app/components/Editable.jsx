import React from 'react';

export default class Editable extends React.Component {

  render() {
    const {editing, ...props} = this.props;

    return (
      <div className="note">
        {editing ?
          this.renderEdit()
          :
          this.renderValue()
        }
      </div>
    );
  }

  renderEdit = () => {
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

  renderValue = () => {
    return (
      <div onClick={this.editTask}>
        <span>{this.props.task}</span>
        {this.props.onDelete ? 
          <button className="deleteNoteBtn" onClick={this.props.onDelete}>x</button>
        :
          null}
      </div>
    );
  };

  checkEnter = (e) => {
    if (e.key === 'Enter')
      this.finishEdit(e);
  };

  finishEdit = (e) => {
    const value = e.target.value;

    if (this.props.onEdit && value.trim()) {
      this.props.onEdit(value);
    }
  };
}